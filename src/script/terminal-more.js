const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

function printLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const command = terminalInput.value.trim();
    terminalInput.value = '';
    if (!command) return;

    printLine(`guest@rafi:~/more$ ${command}`);

    if (command === 'cd ..') {
        printLine('cd: index.html');
        location.href = 'index.html';
    } else {
        printLine(`command not found: ${command}`);
    }
});

document.addEventListener('click', () => terminalInput.focus());
