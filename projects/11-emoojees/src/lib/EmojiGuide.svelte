<script lang='ts'>
  import { addToast } from '../store/toast'

  export let emojiMode: 'code' | 'emoji'

  interface CuratedEmoji {
    emoji: string
    slug: string
    purpose: string
    description: string
  }

  const curatedEmojis: CuratedEmoji[] = [
    {
      emoji: '🎉',
      slug: ':tada:',
      purpose: 'Initial Commit',
      description: 'Start of a new project.',
    },
    {
      emoji: '🔖',
      slug: ':bookmark:',
      purpose: 'Version Tag',
      description: 'Specific software release or version.',
    },
    {
      emoji: '✨',
      slug: ':sparkles:',
      purpose: 'New Feature',
      description: 'New capability addition.',
    },
    {
      emoji: '🐛',
      slug: ':bug:',
      purpose: 'Bug Fix',
      description: 'Correction of a software error.',
    },
    {
      emoji: '🛡️',
      slug: ':shield:',
      purpose: 'Security Fix',
      description: 'Security vulnerability patch.',
    },
    {
      emoji: '♻️',
      slug: ':recycle:',
      purpose: 'Refactor',
      description: 'Improvement of code structure or quality.',
    },
    {
      emoji: '📚',
      slug: ':books:',
      purpose: 'Documentation',
      description: 'Documentation changes or additions.',
    },
    {
      emoji: '🌍',
      slug: ':earth_africa:',
      purpose: 'Globalization',
      description: 'Support for new languages or regions.',
    },
    {
      emoji: '♿',
      slug: ':wheelchair:',
      purpose: 'Accessibility',
      description: 'Enhancements for disability support.',
    },
    {
      emoji: '⚡',
      slug: ':zap:',
      purpose: 'Performance',
      description: 'Enhancements to software speed.',
    },
    {
      emoji: '🎨',
      slug: ':art:',
      purpose: 'UI/UX',
      description: 'Visual changes.',
    },
    {
      emoji: '🔧',
      slug: ':wrench:',
      purpose: 'Tooling',
      description: 'Tool or dependency updates.',
    },
    {
      emoji: '✅',
      slug: ':white_check_mark:',
      purpose: 'Tests',
      description: 'Test additions or changes.',
    },
    {
      emoji: '🗑️',
      slug: ':wastebasket:',
      purpose: 'Removal',
      description: 'Deletion of code or functionality.',
    },
    {
      emoji: '🚧',
      slug: ':construction:',
      purpose: 'Work In Progress',
      description:
        'Ongoing changes that aren\'t ready for full review or merge.',
    },
  ]
</script>

<div class='max-w-3xl mx-auto mb-8'>
  <div class='flex flex-row items-center mb-2'>
    <h1 class='mr-4 text-2xl font-semibold'>Emoji</h1>
    <h1 class='text-5xl'>📖</h1>
  </div>

  <div class='flex flex-row flex-wrap justify-center'>
    {#each curatedEmojis as emoji}
      <button
        on:click={() => {
          if (emojiMode === 'code') {
            navigator.clipboard.writeText(`${emoji.slug}`)
            addToast('Copiado!', emojiMode, `${emoji.slug}`, 2000)
          } else {
            navigator.clipboard.writeText(emoji.emoji)
            addToast('Copiado!', emojiMode, `${emoji.emoji}`, 2000)
          }
        }}
        class='flex flex-col items-center justify-between bg-white dark:bg-slate-800 rounded-2xl shadow-md w-[130px] lg:w-[240px] h-28 my-2 mx-2 py-4 px-4 select-none space-y-2 lg:space-y-0'
      >
        <div class='flex flex-col items-center w-full lg:flex-row lg:justify-between'>
          <h2 class='mt-1 mb-3 text-xs font-semibold text-center lg:text-base lg:mb-0'>
            {emoji.purpose}
          </h2>

          <h1 class='w-16 text-5xl lg:text-4xl'>
            {emoji.emoji}
          </h1>
        </div>

        <div class='hidden lg:block'>
          <p class='w-full text-xs text-center text-slate-500 dark:text-slate-400'>
            {emoji.description}
          </p>
        </div>
      </button>
    {/each}
  </div>
</div>
