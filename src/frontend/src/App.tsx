import { useActor } from "@caffeineai/core-infrastructure";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { createActor } from "./backend";

type FormState = "idle" | "loading" | "success" | "error";

export default function App() {
  const { actor, isFetching } = useActor(createActor);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValid =
    to.trim() !== "" && subject.trim() !== "" && body.trim() !== "";
  const isDisabled = !isValid || state === "loading" || isFetching;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || isDisabled) return;

    setState("loading");
    setErrorMsg("");

    try {
      const result = await actor.sendEmail(
        to.trim(),
        subject.trim(),
        body.trim(),
      );
      if (result.__kind__ === "ok") {
        setState("success");
        setTo("");
        setSubject("");
        setBody("");
      } else {
        setState("error");
        setErrorMsg(result.err ?? "Failed to send message.");
      }
    } catch (_err) {
      setState("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  function handleDismissSuccess() {
    setState("idle");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <main className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-card rounded-2xl shadow-card px-8 py-10 sm:px-10 sm:py-12">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight uppercase">
              Send a Cheerful Message
            </h1>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base">
              Drop a line. Spread some joy.
            </p>
          </div>

          {/* Success Banner */}
          {state === "success" && (
            <div
              data-ocid="send.success_state"
              className="mb-6 flex items-start gap-3 rounded-xl bg-muted p-4 border border-border"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Message sent!
                </p>
                <p className="text-sm text-muted-foreground">
                  Your cheerful message is on its way.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDismissSuccess}
                data-ocid="send.close_button"
                aria-label="Dismiss"
                className="ml-auto shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg leading-none"
              >
                ×
              </button>
            </div>
          )}

          {/* Error Banner */}
          {state === "error" && (
            <div
              data-ocid="send.error_state"
              className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Could not send
                </p>
                <p className="text-sm text-muted-foreground break-words">
                  {errorMsg}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSend} noValidate className="space-y-5">
            {/* To */}
            <div>
              <label
                htmlFor="email-to"
                className="form-label uppercase tracking-wider text-xs"
              >
                Email Address
              </label>
              <input
                id="email-to"
                type="email"
                autoComplete="email"
                placeholder="recipient@email.com"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="form-input bg-muted/60"
                data-ocid="send.input"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="email-subject"
                className="form-label uppercase tracking-wider text-xs"
              >
                Title
              </label>
              <input
                id="email-subject"
                type="text"
                placeholder="Brief Greeting or Subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="form-input bg-muted/60"
                data-ocid="send.subject_input"
                required
              />
            </div>

            {/* Body */}
            <div>
              <label
                htmlFor="email-body"
                className="form-label uppercase tracking-wider text-xs"
              >
                Message Content
              </label>
              <textarea
                id="email-body"
                rows={5}
                placeholder="Write your cheerful message here... Think of it as a digital postcard."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="form-input bg-muted/60 resize-none"
                data-ocid="send.textarea"
                required
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isDisabled}
              data-ocid="send.submit_button"
              className="btn-yellow w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-base uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : "",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors duration-200"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
