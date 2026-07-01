export function handleSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector("input");
  const query = input.value.trim();

  window.location.href = `./recipes.html?search=${encodeURIComponent(query)}`;

  input.value = "";
}
