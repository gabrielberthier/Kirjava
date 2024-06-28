<script lang="ts">
    import { locale } from "$lib/translations/common"


  export let message: string = ''
</script>

<div class="hamburger-menu">
  <button class="burger" data-state="closed">
    <span />
    <span />
    <span />
  </button>
</div>

<main>
  <div class="container max-sm:px-4 mx-auto">
    <div class="flex flex-col justify-center align-middle ">
      <div class="align-middle justify-self-center" />
      <div class="flex flex-col" style="display: flex; flex-direction: column;">
        <h1 class="text-center" style="font-size: 50px;">404</h1>
        <h2>{message}</h2>
        <p style="max-width: 300px;">
          The page you are looking for does not exist. How you got here is a mystery. But you can
          click the button below to go back to the homepage.
        </p>
        <button class="btn-green">
          <a href="/{$locale}">HOME</a>
        </button>
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Nunito+Sans');
  $blue: #0e0620;
  $green: #2ccf6d;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", "Avenir", "Helvetica", "Arial", sans-serif;
    font-weight: 300;
    color: $blue;
    font-size: 1em;
    height: max-content;
    min-height: 80vh;

    p {
      margin: 15px 0px 25px;
      text-align: justify;
      text-justify: inter-word;
    }
  }

  button {
    font-family: "Poppins", "Avenir", "Helvetica", "Arial", sans-serif;
    font-weight: 200;
  }

  .btn-green {
    max-width: 160px;
    z-index: 1;
    overflow: hidden;
    background: transparent;
    position: relative;
    padding: 8px 50px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1em;
    letter-spacing: 2px;
    transition: 0.2s ease;
    font-weight: bold;
    margin: 5px 0px;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid $green;
    color: $blue;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background: $green;
      z-index: -1;
      transition: 0.2s ease;
    }

    &:hover {
      color: #fff;
      background: $green;
      transition: 0.2s ease;

      &::before {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      margin-top: 70px;
      margin-bottom: 70px;
    }
  }
</style>
