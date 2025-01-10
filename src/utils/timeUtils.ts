export function formatTimeRemaining(ms: number): string {
  // 天
  if (ms >= 86400000) {
    const days = Math.floor(ms / 86400000);
    const remainingHours = Math.floor((ms % 86400000) / 3600000);
    return `${days}天${remainingHours}小时`;
  }
  // 小时
  if (ms >= 60 * 60 * 1000) {
    const hours = Math.floor(ms / 3600000);
    const remainingMinutes = Math.floor((ms % 3600000) / 60000);
    return `${hours}小时${remainingMinutes}分钟`;
  }
  // 分钟
  if (ms >= 60 * 1000) {
    const minutes = Math.floor(ms / 60000);
    const remainingSeconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}分${remainingSeconds}秒`;
  }
  // 秒
  return `${Math.floor(ms / 1000)}秒`;
}