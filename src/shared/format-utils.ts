export function findHttpLinks(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const index = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, index)).toFixed(2)) + sizes[index]
  );
}

function padZero(number_: number): string {
  return number_ < 10 ? `0${number_}` : number_.toString();
}

export function formatMillisToTime(milliseconds: number): string {
  if (milliseconds < 0) {
    throw new Error("Time can not be negative");
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = padZero(hours);
  const formattedMinutes = padZero(minutes);
  const formattedSeconds = padZero(seconds);

  return hours > 0
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
}
