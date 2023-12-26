type UnicodeEmoji =
  { emoji: string, name: string, fallback_url: string, description: string }

type GitHubEmoji =
  { name: string, fallback_url: string }

export type Emoji = UnicodeEmoji | GitHubEmoji

export type EmojiList = {
  [key: string]: {
    [key: string]: {
      [key: string]: Emoji
    } | Emoji
  }
}
