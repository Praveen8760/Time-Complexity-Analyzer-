const vscode = require('vscode');
const axios = require('axios');

function getCommentSymbol(languageId) {
  const commentSymbols = {
    javascript: '//',
    typescript: '//',
    python: '#',
    java: '//',
    c: '//',
    cpp: '//',
    csharp: '//',
    ruby: '#',
    go: '//',
    php: '//',
    rust: '//',
    kotlin: '//',
    swift: '//',
    r: '#',
    shellscript: '#',
    perl: '#',
    lua: '--'
  };

  return commentSymbols[languageId] || '//'; // Default fallback
}

function activate(context) {
  // Get the extension settings
  const config = vscode.workspace.getConfiguration('time-complexity-analyzer');
  const enableAutoAnalyze = config.get('enableAutoAnalyze');
  const enableHighlighting = config.get('enableHighlighting');
  const autoAnalyzeOnSave = config.get('autoAnalyzeOnSave');

  // Create a status bar item to display the time complexity
  const timeComplexityStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
  timeComplexityStatusBarItem.text = '⏱ Time Complexity: Calculating...';
  timeComplexityStatusBarItem.tooltip = 'Click to analyze time complexity';
  timeComplexityStatusBarItem.command = 'time-complexity-analyzer.analyzeCode';  // Make it clickable
  timeComplexityStatusBarItem.show();

  let disposable = vscode.commands.registerCommand('time-complexity-analyzer.analyzeCode', async function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage("No active editor");
      return;
    }

    const code = editor.document.getText();
    const language = editor.document.languageId;
    const commentSymbol = getCommentSymbol(language);

    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Analyzing Code...",
      cancellable: false
    }, async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/analyze', {
          code,
          language
        });

        // Extract just the Big-O notation
        const result = res.data.result.replace(/\*\*/g, '').trim();
        const match = result.match(/1\.\s*(O\(.+?\))/);

        if (match) {
          const complexity = match[1]; // O(n) or O(n^2), etc.
          const description = result.split('\n')[1] || ''; // Extract description, if available

          // Update the status bar with the complexity (no description)
          timeComplexityStatusBarItem.text = `⏱ Time Complexity: ${complexity}`;

          // Insert a comment with the overall complexity at the top
          const complexityComment = `${commentSymbol} ⏱ Time Complexity: ${complexity}`;
          editor.edit(editBuilder => {
            const position = new vscode.Position(0, 0);
            editBuilder.insert(position, complexityComment + '\n');
          });

          // Show information message with the time complexity and its description
          vscode.window.showInformationMessage(`📊 Time Complexity: ${complexity} - ${description}`);
        } else {
          vscode.window.showWarningMessage("Couldn't extract time complexity from response.");
        }

      } catch (err) {
        vscode.window.showErrorMessage("Error analyzing code: " + err.message);
      }
    });
  });

  context.subscriptions.push(disposable);

  // Automatically analyze the code when saving if enabled
  if (autoAnalyzeOnSave) {
    vscode.workspace.onDidSaveTextDocument(async (document) => {
      if (document.languageId === 'javascript' || document.languageId === 'typescript') {
        vscode.commands.executeCommand('time-complexity-analyzer.analyzeCode');
      }
    });
  }
}

function deactivate() {}

exports.activate = activate;
exports.deactivate = deactivate;
