/**
 * @type {string | null}
 */
let clientVersion = null;
let lastVersionCheckDate = 0;

const checkVersion = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  };
  if (lastVersionCheckDate < Date.now() - 60 * 60 * 1000) {
    // @ts-ignore
    fetch(`${window.location.origin}/version.json`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        lastVersionCheckDate = Date.now();
        if (!clientVersion) {
          clientVersion = result;
        }
        if (clientVersion !== result) {
          window.location.reload();
        }
      })
      .catch((error) =>
        console.error("something went wrong while fetching version", error)
      );
  }
};

window.addEventListener("focus", checkVersion);
if (!localStorage.getItem("loaded")) {
  console.log(`no local storage item loaded`);
  localStorage.setItem("loaded", "true");
  window.location.reload();
}
