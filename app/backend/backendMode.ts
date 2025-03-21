export let backendMode: "mock" | "local" | "prod" | "legacy" = "mock";

if (typeof window !== "undefined") {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1"
  ) {
    backendMode = "prod";
  } else if (window.location.hostname === "mock.localhost") {
    backendMode = "mock";
  } else {
    backendMode = "prod";
  }
}
