export default function getError(err: unknown): string | undefined {
  if (err instanceof Error) return err.message;
}
