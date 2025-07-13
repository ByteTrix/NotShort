---
layout: ../layouts/AboutLayout.astro
---

<h2 class="handwritten-title">The Story Behind This Weird Idea</h2>

<style>
/* Custom styles for about page */
.handwritten-title {
  font-family: 'Caveat', 'Dancing Script', cursive;
  font-size: 2.8rem; /* Adjusted for a main title */
  font-weight: 400;
  letter-spacing: 0.04em;
  color: #374151; /* Dark gray for light mode */
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px dashed #d1d5db; /* Subtle underline */
}

.dark .handwritten-title {
  color: #e5e7eb; /* Light gray for dark mode */
  border-bottom-color: #4b5563; /* Darker underline for dark mode */
}

.dev-section {
  display: grid; /* Changed to grid */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
  gap: 2rem; /* Adjusted gap */
  margin: 3rem 0;
}

/* Styles adapted from .feature-card in index.astro */
.dev-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(229, 231, 235, 1);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 320px; /* Ensure consistent height */
}

.dev-card:hover {
  transform: translateY(-6px) scale(1.02); /* Subtle lift and scale */
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  border-color: rgba(156, 163, 175, 0.7);
}

/* Avatar styles adapted from .feature-icon-wrapper */
.dev-avatar-wrapper {
  width: 90px; /* Slightly larger avatar */
  height: 90px;
  border-radius: 50%;
  background: rgba(243, 244, 246, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  flex-shrink: 0;
  overflow: hidden; /* Ensure image stays within circle */
  border: 3px solid white; /* Add border like contributor avatars */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.dev-card:hover .dev-avatar-wrapper {
  transform: scale(1.1);
  background: rgba(229, 231, 235, 1);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.dev-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.dev-card:hover .dev-avatar {
  transform: scale(1.05);
}

/* Updated text styles */
.dev-card h3 {
  font-family: monospace; /* Match FounderCard */
  font-size: 1.125rem; /* Match FounderCard (text-lg) */
  line-height: 1.75rem; /* Match FounderCard (text-lg) */
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.5rem; /* Reduced margin */
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.dev-card .role {
  font-size: 0.8rem; /* Adjusted size */
  font-weight: 600;
  color: #4f46e5; /* Keep themed color */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem; /* Adjusted margin */
  position: relative;
  z-index: 1;
}

.dev-card p:not(.role):not(.quote) {
  font-size: 0.875rem; /* Match FounderCard quote (text-sm) */
  line-height: 1.625; /* Match FounderCard quote (leading-relaxed) */
  font-style: italic; /* Match FounderCard quote */
  color: #6B7280;
  /* font-weight: 500; Removed */
  position: relative;
  z-index: 1;
  flex-grow: 1;
  width: 95%;
  margin-bottom: 1rem;
}

.dev-card .quote {
  font-style: italic;
  border-left: 3px solid #8b5cf6;
  padding-left: 1rem;
  margin-top: 1rem;
  color: #374151; /* Darker color for better readability in light mode */
  font-size: 0.875rem; /* Match FounderCard quote (text-sm) */
  line-height: 1.625; /* Match FounderCard quote (leading-relaxed) */
  width: 90%;
  text-align: left;
}

.donate-banner {
  background: linear-gradient(135deg, #fef3c7 0%, #fecaca 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.donate-banner h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #b91c1c;
}

.donate-banner p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.donate-button {
  display: inline-block;
  background: #b91c1c;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.donate-button:hover {
  background: #991b1b;
  transform: translateY(-2px);
}

/* Dark mode support */
.dark .dev-card {
  background: rgba(17, 24, 39, 0.9); /* Dark background from feature-card */
  border: 1px solid rgba(55, 65, 81, 1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.dark .dev-card:hover {
  border-color: rgba(75, 85, 99, 0.8);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

.dark .dev-avatar-wrapper {
  background: rgba(31, 41, 55, 0.8);
  border-color: #111827; /* Darker border for avatar */
}

.dark .dev-card:hover .dev-avatar-wrapper {
  background: rgba(55, 65, 81, 1);
}

.dark .dev-card h3 {
  color: #F9FAFB;
}

.dark .dev-card .role {
  color: #a5b4fc; /* Keep lighter themed color */
}

.dark .dev-card p:not(.role):not(.quote) {
  color: #9CA3AF;
}

.dark .dev-card .quote {
  border-left-color: #a78bfa;
  color: #D1D5DB; /* Lighter color for better readability in dark mode */
}

.dark .chalk-text h2 {
  color: #f3f4f6;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.5);
  border-bottom-color: #9ca3af;
}

.dark .chalk-text h2:after {
  background-image: repeating-linear-gradient(to right, #9ca3af 0%, #9ca3af 50%, transparent 50%, transparent 100%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .dev-section {
    flex-direction: column;
  }
  
  .chalk-text h2 {
    font-size: 1.5rem;
  }
  
  .donate-banner {
    padding: 1.5rem;
  }
  
  .donate-banner h3 {
    font-size: 1.5rem;
  }
}

.blog-link {
  color: #2563eb;
  text-decoration: underline;
  font-weight: 600;
  transition: color 0.2s;
}
.blog-link:hover {
  color: #1d4ed8;
}
</style>


Hey there! I'm **Kavin**, a BTech IT graduate with too much time and not enough common sense. During what should have been a relaxing holiday break, my brain decided that what the internet really needed was the exact opposite of a URL shortener. Because why make things more efficient when you can make them hilariously complex?

## The Dream Team

<div class="dev-section">
  <div class="dev-card">
    <div class="dev-avatar-wrapper">
      <img src="https://github.com/itskavin.png" alt="Kavin Avatar" class="dev-avatar" />
    </div>
    <h3>Kavin</h3>
    <p class="role">Chief Elongation Officer (CEO)</p>
    <p>" That's me! I built this absurdity during what was supposed to be a boring holiday. Instead of catching up on sleep or touching grass, I decided to create a service that literally nobody asked for.</br> You're welcome, internet! " </p>
  </div>

  <div class="dev-card">
     <div class="dev-avatar-wrapper">
      <img src="https://github.com/zomb56.png" alt="Gowtham Avatar" class="dev-avatar" />
    </div>
    <h3>Gowtham</h3>
    <p class="role">Chief Umm.. Officer (CUO)</p>
    <p>" My classmate and unwilling accomplice who, despite not being a tech enthusiast, provided invaluable help with template searching, URL longification logic, and design feedback ("No da, that shade of neon green will literally blind users").. "</p>
    <p class="quote">"Thanks da!" - Me to Gowtham, constantly</p>
  </div>
</div>

## Our Tech Stack (Yes, We Used Real Technology)

NotShort is built with these awesome tools:

- **Astro** - For super fast website building
- **TypeScript** - Because we like our code organized just like our long URLs
- **Supabase** - Taking care of our database, login system, and server stuff
- **UnoCSS** - Making our site look nice with simple styling tools

## Why Make URLs Longer? (Why Not?!)

Everyone's trying to make things shorter these days. URL shorteners? Boring! Everyone's doing that! But URL *lengtheners*? That's something new that nobody asked for!

Our goal is simple: take normal URLs and turn them into super long links that are fun to share and impossible to type by hand.

## How It Started 

The idea for NotShort came during a boring holiday break. Instead of doing something useful like learning new stuff or going outside, I thought the world needed something silly and fun. And so, NotShort was born – made from boredom, with love.

## How We Built It

Building this site was fun, with help from:

- **AI Helpers**: GitHub Copilot (Claude 3.7 Sonnet, GPT-4.1) and Roo Code (Gemini 2.5 Pro API)
- **Starting Template**: The "Naid" template from Astro's website, which we changed from a portfolio into our site
- **Design Idea**: "If it makes you laugh, it's good"
- **When Things Break**: "Try turning it off and on again"

## Future Plans (If People Use This)

We're using Supabase's free plan right now, which has some limits. If more people start using our site, we want to:

- Let you choose how long your URLs should be
- Make URLs with words about topics you choose
- Use AI to make even funnier URLs
- Add a paid plan to help pay for our servers

<div class="donate-banner">
  <h3>💰 Help Keep NotShort Running! 💰</h3>
  <p>So far, I've only spent my time and paid for the domain name. If you enjoy making super long URLs, please think about donating!</p>
  <a href="#donate" class="donate-button">Donate Now</a>
</div>

## Want the Full Story?

Curious about our tech stack and development journey? Check out our <a href="/blog/our_tech_stack_and_journey" class="blog-link">detailed blog post</a> for the complete behind-the-scenes look!

## Link Policy

At NotShort, we handle links in a special way:

1. **One URL, One Long Link Per Account**: To save space and keep things running smoothly, each original URL can have one long version per account!

2. **Sharing Is Caring**: If you try to make a long URL for a link someone else already made, we'll show you the existing long URL instead of making a new one.

3. **Credit Where It's Due**: When you see an existing long URL, we'll show you who made it first.

4. **Why We Do This**: This approach helps us:
   - Use less database space
   - Keep links consistent
   - Stop spam
   - Keep the service free

We think this is the best way to keep our silly link service fun and working well for everyone.

## Terms of Use

When using NotShort, please:

1. **Be Nice**: Don't use our service for anything harmful, illegal, or mean.

2. **Don't Break It**: Please don't try to overload or hack our site.

3. **No Guarantees**: We try our best, but can't promise the service will always work perfectly.

4. **Have Fun**: That's what this site is for!

## FAQ

### What is NotShort?
NotShort makes your short links really, really long. It's the opposite of a URL shortener!

### Is this free?
Yes! We're currently free to use. If we grow a lot, we might add premium features.

### Can I customize my long URLs?
Not yet, but we're planning to add this feature soon!

### Why would anyone want longer URLs?
Why not? They're fun, surprising, and definitely more memorable than boring short URLs!

### How long do the links last?
Forever! Or at least until our service shuts down (which we hope never happens).

### I found a bug, what should I do?
Please let us know by contacting us or opening an issue on our GitHub page!