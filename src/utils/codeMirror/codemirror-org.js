(mod => {
  mod(require("../../../node_modules/codemirror/lib/codemirror.js"));
})(CodeMirror => {
  CodeMirror.defineSimpleMode("org", {
    start: [
      {
        regex: /(\*\s)(.*?)(:[\S]+:|)$/,
        sol: true,
        token: [
          "org-level-one org-stars",
          "org-level-one org-heading",
          "org-level-one org-tag"
        ]
      },
      {
        regex: /(\*{2}\s)(.*?)(:[\S]+:|)$/,
        sol: true,
        token: [
          "org-level-two org-stars",
          "org-level-two org-heading",
          "org-level-two org-tag"
        ]
      },
      {
        regex: /(\*{3}\s)(.*?)(:[\S]+:|)$/,
        sol: true,
        token: [
          "org-level-three org-stars",
          "org-level-three org-heading",
          "org-level-three org-tag"
        ]
      },
      {
        regex: /(\*{4}\s)(.*?)(:[\S]+:|)$/,
        sol: true,
        token: [
          "org-level-four org-stars",
          "org-level-four org-heading",
          "org-level-four org-tag"
        ]
      },
      {
        regex: /(\*{5}\s)(.*?)(:[\S]+:|)$/,
        sol: true,
        token: [
          "org-level-five org-stars",
          "org-level-five org-heading",
          "org-level-five org-tag"
        ]
      },
      {
        regex: /(\*{6,}\s)(.*?)(:[\S]+:|)$/,
        sol: true,
        token: [
          "org-level-six org-stars",
          "org-level-six org-heading",
          "org-level-six org-tag"
        ]
      },
      {
        regex: /(-\s)(.*)/,
        sol: true,
        token: ["org-list org-dash", "org-list org-text"]
      }
    ]
  });

  CodeMirror.registerHelper("fold", "orgmode", function(cm, start) {
    // init
    const levelToMatch = headerLevel(start.line);

    // no folding needed
    if (levelToMatch === null) return;

    // find folding limits
    const lastLine = cm.lastLine();
    let end = start.line;
    while (end < lastLine) {
      end += 1;
      let level = headerLevel(end);
      if (level && level <= levelToMatch) {
        end = end - 1;
        break;
      }
    }

    return {
      from: CodeMirror.Pos(start.line, cm.getLine(start.line).length),
      to: CodeMirror.Pos(end, cm.getLine(end).length)
    };

    function headerLevel(lineNo) {
      var line = cm.getLine(lineNo);
      var match = /^\*+/.exec(line);
      if (
        match &&
        match.length === 1 &&
        /header/.test(cm.getTokenTypeAt(CodeMirror.Pos(lineNo, 0)))
      ) {
        return match[0].length;
      }
      return null;
    }
  });
  CodeMirror.registerGlobalHelper(
    "fold",
    "drawer",
    function(mode) {
      return mode.name === "orgmode" ? true : false;
    },
    function(cm, start) {
      const drawer = isBeginningOfADrawer(start.line);
      if (drawer === false) return;

      // find folding limits
      const lastLine = cm.lastLine();
      let end = start.line;
      while (end < lastLine) {
        end += 1;
        if (isEndOfADrawer(end)) {
          break;
        }
      }

      return {
        from: CodeMirror.Pos(start.line, cm.getLine(start.line).length),
        to: CodeMirror.Pos(end, cm.getLine(end).length)
      };

      function isBeginningOfADrawer(lineNo) {
        var line = cm.getLine(lineNo);
        var match = /^\:.*\:$/.exec(line);
        if (match && match.length === 1 && match[0] !== ":END:") {
          return true;
        }
        return false;
      }
      function isEndOfADrawer(lineNo) {
        var line = cm.getLine(lineNo);
        return line.trim() === ":END:" ? true : false;
      }
    }
  );

  CodeMirror.defineMIME("text/org", "org");
});
