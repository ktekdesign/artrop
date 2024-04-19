export default function getError(err: unknown) {
  if (err instanceof Error) return err.message;
}
