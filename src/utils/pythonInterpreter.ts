/**
 * Lightweight Educational Python Subset Interpreter
 * Specially designed for SMA/SMK Grade 10 Intro to Python
 * Handles variables, standard types, for loops, while loops, if/else, and print()
 */

export interface ExecutionStep {
  lineIndex: number;
  lineContent: string;
  variables: Record<string, any>;
  output: string[];
  explanation: string;
}

export interface RunResult {
  success: boolean;
  output: string[];
  error?: string;
  steps: ExecutionStep[];
  variables: Record<string, any>;
}

export function runPythonCode(code: string): RunResult {
  const lines = code.split('\n');
  const output: string[] = [];
  const steps: ExecutionStep[] = [];
  const vars: Record<string, any> = {};

  let stepCount = 0;
  const MAX_STEPS = 500;

  try {
    let i = 0;
    while (i < lines.length) {
      if (stepCount++ > MAX_STEPS) {
        throw new Error('Batas iterasi terlampaui (kemungkinan terjadi Infinite Loop pada while loop). Periksa kondisi perulangan!');
      }

      const rawLine = lines[i];
      const trimmed = rawLine.trim();

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        i++;
        continue;
      }

      // Check indentation level
      const indent = rawLine.search(/\S|$/);

      // Handle For Loop: for x in range(...) or for x in list
      const forRangeMatch = trimmed.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\((.*)\)\s*:/);
      const forListMatch = trimmed.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+([a-zA-Z_]\w*|\[.*\])\s*:/);

      if (forRangeMatch) {
        const loopVar = forRangeMatch[1];
        const rangeArgsStr = forRangeMatch[2];
        const rangeArgs = rangeArgsStr.split(',').map((s) => evalExpr(s.trim(), vars));
        
        let start = 0;
        let stop = 0;
        let step = 1;

        if (rangeArgs.length === 1) {
          stop = Number(rangeArgs[0]);
        } else if (rangeArgs.length === 2) {
          start = Number(rangeArgs[0]);
          stop = Number(rangeArgs[1]);
        } else if (rangeArgs.length >= 3) {
          start = Number(rangeArgs[0]);
          stop = Number(rangeArgs[1]);
          step = Number(rangeArgs[2]);
        }

        // Collect body block
        const bodyLines: { index: number; line: string }[] = [];
        let j = i + 1;
        while (j < lines.length) {
          const bodyRaw = lines[j];
          if (!bodyRaw.trim() || bodyRaw.trim().startsWith('#')) {
            j++;
            continue;
          }
          const bodyIndent = bodyRaw.search(/\S|$/);
          if (bodyIndent <= indent) {
            break;
          }
          bodyLines.push({ index: j, line: bodyRaw });
          j++;
        }

        // Execute loop iterations
        const values: number[] = [];
        if (step > 0) {
          for (let val = start; val < stop; val += step) {
            values.push(val);
            if (values.length > 300) break;
          }
        } else if (step < 0) {
          for (let val = start; val > stop; val += step) {
            values.push(val);
            if (values.length > 300) break;
          }
        }

        for (const val of values) {
          vars[loopVar] = val;
          steps.push({
            lineIndex: i,
            lineContent: trimmed,
            variables: { ...vars },
            output: [...output],
            explanation: `Perulangan 'for': variabel ${loopVar} bernilai ${val}`,
          });

          // execute block lines
          for (const bLine of bodyLines) {
            executeSimpleLine(bLine.line.trim(), vars, output, bLine.index, steps);
          }
        }

        i = j;
        continue;
      }

      if (forListMatch) {
        const loopVar = forListMatch[1];
        const listTarget = evalExpr(forListMatch[2], vars);
        const listItems = Array.isArray(listTarget) ? listTarget : [];

        // Collect body
        const bodyLines: { index: number; line: string }[] = [];
        let j = i + 1;
        while (j < lines.length) {
          const bodyRaw = lines[j];
          if (!bodyRaw.trim() || bodyRaw.trim().startsWith('#')) {
            j++;
            continue;
          }
          const bodyIndent = bodyRaw.search(/\S|$/);
          if (bodyIndent <= indent) {
            break;
          }
          bodyLines.push({ index: j, line: bodyRaw });
          j++;
        }

        for (const item of listItems) {
          vars[loopVar] = item;
          steps.push({
            lineIndex: i,
            lineContent: trimmed,
            variables: { ...vars },
            output: [...output],
            explanation: `Perulangan list: mengambil elemen ${JSON.stringify(item)} ke dalam ${loopVar}`,
          });

          for (const bLine of bodyLines) {
            executeSimpleLine(bLine.line.trim(), vars, output, bLine.index, steps);
          }
        }

        i = j;
        continue;
      }

      // Handle While Loop: while condition:
      const whileMatch = trimmed.match(/^while\s+(.*)\s*:/);
      if (whileMatch) {
        const condExpr = whileMatch[1];
        // Collect body
        const bodyLines: { index: number; line: string }[] = [];
        let j = i + 1;
        while (j < lines.length) {
          const bodyRaw = lines[j];
          if (!bodyRaw.trim() || bodyRaw.trim().startsWith('#')) {
            j++;
            continue;
          }
          const bodyIndent = bodyRaw.search(/\S|$/);
          if (bodyIndent <= indent) {
            break;
          }
          bodyLines.push({ index: j, line: bodyRaw });
          j++;
        }

        let loopCount = 0;
        while (Boolean(evalExpr(condExpr, vars))) {
          if (loopCount++ > 200) {
            throw new Error(`Infinite Loop terdeteksi pada baris ${i + 1}: 'while ${condExpr}'. Variabel kondisi tidak di-update dengan benar.`);
          }

          steps.push({
            lineIndex: i,
            lineContent: trimmed,
            variables: { ...vars },
            output: [...output],
            explanation: `Kondisi 'while (${condExpr})' bernilai True, menjalankan blok kode perulangan.`,
          });

          for (const bLine of bodyLines) {
            executeSimpleLine(bLine.line.trim(), vars, output, bLine.index, steps);
          }
        }

        steps.push({
          lineIndex: i,
          lineContent: trimmed,
          variables: { ...vars },
          output: [...output],
          explanation: `Kondisi 'while (${condExpr})' sekarang False, perulangan berhenti.`,
        });

        i = j;
        continue;
      }

      // Handle If / Else blocks
      const ifMatch = trimmed.match(/^if\s+(.*)\s*:/);
      if (ifMatch) {
        const cond = Boolean(evalExpr(ifMatch[1], vars));
        const bodyLines: { index: number; line: string }[] = [];
        let j = i + 1;
        while (j < lines.length) {
          const bodyRaw = lines[j];
          if (!bodyRaw.trim() || bodyRaw.trim().startsWith('#')) {
            j++;
            continue;
          }
          if (bodyRaw.search(/\S|$/) <= indent) break;
          bodyLines.push({ index: j, line: bodyRaw });
          j++;
        }

        // Check if there is an else block
        let elseLines: { index: number; line: string }[] = [];
        if (j < lines.length && lines[j].trim().startsWith('else:')) {
          let k = j + 1;
          while (k < lines.length) {
            const elseRaw = lines[k];
            if (!elseRaw.trim() || elseRaw.trim().startsWith('#')) {
              k++;
              continue;
            }
            if (elseRaw.search(/\S|$/) <= indent) break;
            elseLines.push({ index: k, line: elseRaw });
            k++;
          }
          j = k;
        }

        if (cond) {
          for (const b of bodyLines) {
            executeSimpleLine(b.line.trim(), vars, output, b.index, steps);
          }
        } else {
          for (const b of elseLines) {
            executeSimpleLine(b.line.trim(), vars, output, b.index, steps);
          }
        }

        i = j;
        continue;
      }

      // Simple Statement (Assignment, print, etc.)
      executeSimpleLine(trimmed, vars, output, i, steps);
      i++;
    }

    return {
      success: true,
      output,
      steps,
      variables: vars,
    };
  } catch (err: any) {
    return {
      success: false,
      output,
      error: err.message || String(err),
      steps,
      variables: vars,
    };
  }
}

function executeSimpleLine(
  line: string,
  vars: Record<string, any>,
  output: string[],
  lineIndex: number,
  steps: ExecutionStep[]
) {
  if (!line || line.startsWith('#')) return;

  // Print statement: print(...)
  if (line.startsWith('print(') && line.endsWith(')')) {
    const inner = line.slice(6, -1);
    const printedVal = evaluatePrintArguments(inner, vars);
    output.push(printedVal);

    steps.push({
      lineIndex,
      lineContent: line,
      variables: { ...vars },
      output: [...output],
      explanation: `Mencetak ke layar terminal: "${printedVal}"`,
    });
    return;
  }

  // Augmented assignments: x += 1, x -= 1, etc.
  const augMatch = line.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=|\/=)\s*(.*)$/);
  if (augMatch) {
    const varName = augMatch[1];
    const op = augMatch[2];
    const expr = augMatch[3];
    const currentVal = vars[varName] ?? 0;
    const rhsVal = evalExpr(expr, vars);

    let newVal = currentVal;
    if (op === '+=') newVal = currentVal + rhsVal;
    else if (op === '-=') newVal = currentVal - rhsVal;
    else if (op === '*=') newVal = currentVal * rhsVal;
    else if (op === '/=') newVal = currentVal / rhsVal;

    vars[varName] = newVal;
    steps.push({
      lineIndex,
      lineContent: line,
      variables: { ...vars },
      output: [...output],
      explanation: `Mengubah nilai ${varName} menjadi ${formatValue(newVal)}`,
    });
    return;
  }

  // Standard assignment: var_name = expression
  const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.*)$/);
  if (assignMatch) {
    const varName = assignMatch[1];
    const expr = assignMatch[2];
    const val = evalExpr(expr, vars);
    vars[varName] = val;

    steps.push({
      lineIndex,
      lineContent: line,
      variables: { ...vars },
      output: [...output],
      explanation: `Menyimpan nilai ${formatValue(val)} (tipe: ${getPythonType(val)}) ke dalam variabel '${varName}'`,
    });
    return;
  }

  // Evaluate simple expression
  evalExpr(line, vars);
}

function evaluatePrintArguments(argsStr: string, vars: Record<string, any>): string {
  // Support f-string like f"Halo {nama}, umurmu {umur}"
  if (argsStr.startsWith('f"') || argsStr.startsWith("f'")) {
    const quote = argsStr[1];
    if (argsStr.endsWith(quote)) {
      let rawTemplate = argsStr.slice(2, -1);
      return rawTemplate.replace(/\{([^}]+)\}/g, (_, expression) => {
        try {
          return String(evalExpr(expression.trim(), vars));
        } catch {
          return `{${expression}}`;
        }
      });
    }
  }

  // Split comma separated args that are not inside quotes or brackets
  const args = splitTopLevelCommas(argsStr);
  const evaluated = args.map((arg) => {
    const res = evalExpr(arg.trim(), vars);
    if (typeof res === 'boolean') return res ? 'True' : 'False';
    if (res === null || res === undefined) return 'None';
    if (Array.isArray(res)) return `[${res.map((r) => formatValue(r)).join(', ')}]`;
    return String(res);
  });

  return evaluated.join(' ');
}

function splitTopLevelCommas(str: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes: string | null = null;
  let bracketDepth = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (inQuotes) {
      current += char;
      if (char === inQuotes && str[i - 1] !== '\\') {
        inQuotes = null;
      }
    } else if (char === '"' || char === "'") {
      inQuotes = char;
      current += char;
    } else if (char === '[' || char === '(' || char === '{') {
      bracketDepth++;
      current += char;
    } else if (char === ']' || char === ')' || char === '}') {
      bracketDepth--;
      current += char;
    } else if (char === ',' && bracketDepth === 0) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim().length > 0) {
    result.push(current);
  }

  return result;
}

export function evalExpr(expr: string, vars: Record<string, any>): any {
  expr = expr.trim();

  if (expr === 'True') return true;
  if (expr === 'False') return false;
  if (expr === 'None') return null;

  // Number literal
  if (/^-?\d+$/.test(expr)) return parseInt(expr, 10);
  if (/^-?\d+\.\d+$/.test(expr)) return parseFloat(expr);

  // String literal
  if (
    (expr.startsWith('"') && expr.endsWith('"')) ||
    (expr.startsWith("'") && expr.endsWith("'"))
  ) {
    return expr.slice(1, -1);
  }

  // List literal: [1, 2, 3] or ["a", "b"]
  if (expr.startsWith('[') && expr.endsWith(']')) {
    const inner = expr.slice(1, -1).trim();
    if (!inner) return [];
    return splitTopLevelCommas(inner).map((item) => evalExpr(item.trim(), vars));
  }

  // len(list)
  const lenMatch = expr.match(/^len\((.*)\)$/);
  if (lenMatch) {
    const target = evalExpr(lenMatch[1], vars);
    return Array.isArray(target) || typeof target === 'string' ? target.length : 0;
  }

  // type(val)
  const typeMatch = expr.match(/^type\((.*)\)$/);
  if (typeMatch) {
    const target = evalExpr(typeMatch[1], vars);
    return `<class '${getPythonType(target)}'>`;
  }

  // Variable lookup if pure identifier
  if (/^[a-zA-Z_]\w*$/.test(expr)) {
    if (expr in vars) return vars[expr];
    throw new Error(`NameError: name '${expr}' is not defined`);
  }

  // List indexing: list_name[index]
  const indexMatch = expr.match(/^([a-zA-Z_]\w*)\[(.*)\]$/);
  if (indexMatch) {
    const target = vars[indexMatch[1]];
    const indexVal = evalExpr(indexMatch[2], vars);
    if (Array.isArray(target) || typeof target === 'string') {
      const idx = Number(indexVal);
      if (idx < 0 || idx >= target.length) {
        throw new Error(`IndexError: index ${idx} out of range`);
      }
      return target[idx];
    }
  }

  // Binary expression / math safe evaluation
  // Transform Python operators: and -> &&, or -> ||, not -> !, True -> true, False -> false
  let safeJs = expr
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\bnot\s+/g, '!')
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\/\//g, 'Math.floor') // placeholder for floor division
    .replace(/\*\*/g, '**');

  // Replace variable identifiers with scoped lookups
  safeJs = safeJs.replace(/\b([a-zA-Z_]\w*)\b/g, (match) => {
    if (['true', 'false', 'null', 'Math', 'floor'].includes(match)) return match;
    if (match in vars) {
      return JSON.stringify(vars[match]);
    }
    return match;
  });

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${safeJs});`);
    return fn();
  } catch {
    if (expr in vars) return vars[expr];
    throw new Error(`SyntaxError: ekspresi '${expr}' tidak valid`);
  }
}

export function getPythonType(val: any): string {
  if (typeof val === 'string') return 'str';
  if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'float';
  if (typeof val === 'boolean') return 'bool';
  if (Array.isArray(val)) return 'list';
  if (typeof val === 'object' && val !== null) return 'dict';
  return 'NoneType';
}

export function formatValue(val: any): string {
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'boolean') return val ? 'True' : 'False';
  if (Array.isArray(val)) return `[${val.map(formatValue).join(', ')}]`;
  return String(val);
}
