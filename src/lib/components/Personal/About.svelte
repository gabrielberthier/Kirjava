<script lang="ts">
  import SocialLinks from '$components/Social/SocialLinks.svelte'
  import { avatar, name, whereIam } from '$lib/info'
  import { t } from '$lib/translations/common'
</script>

<div class="relative md:px-4 sm:px-0 lg:px-12">
  <section class="flex flex-col gap-16 pt-8 pb-16">
    <div class="w-full gap-6 rounded-lg items-center">
      <div class="absolute banner-gabri">
        <div class="bg-red-400 w-full h-full area">
          <ul class="circles">
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>
      <div class="">
        <img
          src={avatar}
          alt={name}
          class="rounded-full w-36 h-36 ring-2 ring-zinc-200 dark:ring-zinc-700
        max-md:mx-auto border-solid border-2 border-sky-700 shadow-2xl
        dark:shadow-gray-800 z-10 relative"
        />
      </div>
      <div class="my-6 max-w-xl lg:max-w-1/4">
        <div class="max-md:text-center" style="text-align: justify; text-justify: inter-word;">
          <h1
            class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
          >
            Gabriel Berthier
          </h1>
          <p
            class="text-base
            text-zinc-600 dark:text-zinc-400
            max-md:text-justify text-base text-zinc-600
            dark:text-zinc-400 relative
            sm:py-6 max-md:my-4"
          >
            {@html $t('bio.whoammi')}
          </p>
          <div class="flex gap-6 mt-2 max-md:py-4 max-md:flex-center max-md:justify-center">
            <a href="/about" class="group flex justify-center" aria-label="Follow on Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 pr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>{whereIam}</span>
            </a>
          </div>
          <div class="flex gap-4 mt-4 max-md:py-3 max-md:flex-center max-md:justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style lang="scss">
  .banner-gabri {
    height: 120%;
    top: -100%;
    left: -3rem;
    width: calc(100% + 5rem);
    z-index: 1;
  }

  .area {
    background: #4e54c8;
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 12;
  }

  .circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
    z-index: 15;
  }

  .circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  .circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }

  @mixin change($width, $left: -3rem) {
    // your SCSS here
    .banner-gabri {
      width: calc(100% + $width);
      left: $left;
    }
  }

  @media (min-width: 640px) {
    @include change($width: 6rem);
  }

  @media (min-width: 1024px) {
    @include change($width: 8rem, $left: -4rem);
  }
  @media (min-width: 1280px) {
    @include change($width: 6rem);
  }
</style>
