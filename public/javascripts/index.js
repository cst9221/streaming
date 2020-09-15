function setCookie(username) {
  document.cookie = `username=${username};`;
  // expires=${date.toUTCString()};
  let cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );
console.log(cookies.username)
}
