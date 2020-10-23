const form: HTMLFormElement = document.querySelector("[name='verify']");
const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll(
  ".pin-code input"
);
const submitButton: HTMLButtonElement = form.querySelector('[type="submit"]');

function handleKeydown(e: KeyboardEvent) {
  const isBackspace = e.key === "Backspace" || e.code === "Backspace";
  const input = e.target as HTMLInputElement;

  if (input.previousElementSibling !== null && isBackspace) {
    (input.previousElementSibling as HTMLInputElement).focus();
    (input.previousElementSibling as HTMLInputElement).select();
    return;
  }
}

function handleInput(e: InputEvent) {
  const input = e.target as HTMLInputElement;

  if (input.nextElementSibling !== null && input.value) {
    (input.nextElementSibling as HTMLInputElement).focus();
    (input.nextElementSibling as HTMLInputElement).select();
  }
}

function handleFocus(e: Event) {
  const input = e.target as HTMLInputElement;

  if (input.value) {
    input.select();
  }
}

function handlePaste(e: ClipboardEvent) {
  const pasted = e.clipboardData.getData("text");

  inputs.forEach(
    (input: HTMLInputElement, idx) => (input.value = pasted[idx] || "")
  );

  submitButton.click();
}

function handleSubmit(e: Event) {
  e.preventDefault();
  let code = "";
  inputs.forEach((i) => (code += i.value));
  console.log("form submitted, code is:", code);
}

form.addEventListener("keydown", handleKeydown);
form.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);
inputs[0].addEventListener("paste", handlePaste);
inputs[0].addEventListener("focus", handleFocus);
inputs[0].addEventListener("click", handleFocus);
