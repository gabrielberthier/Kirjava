<script lang="ts">
  import { t } from '$lib/translations/common'
</script>

<div class="mx-auto max-w-7xl lg:px-12 sm:px-8 mt-16 sm:mt-32" style="min-height: 100vh;">
  <div class="text-center mx-auto">
    <h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">{$t('projects.title')}</h1>

    <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400 max-w-prose mx-auto">
      {$t('projects.text')}
    </p>
    <br />

    <p />
  </div>

  <div class="mx-auto max-w-2xl lg:max-w-5xl">
    <div class="mt-16 sm:mt-20">
      <ul class="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <li class="group relative flex flex-col items-start">
          <div
            class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full
            bg-white shadow-md shadow-zinc-800/5 ring-1
            ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
          >
            <img
              alt=""
              src="https://i0.wp.com/amc-ma.org/wp-content/uploads/2021/08/LOGO-NORMAL-02-3-e1637110839145.png?w=522&ssl=1"
              width="32"
              height="32"
              decoding="async"
              data-nimg="1"
              class="h-8 w-8 object-contain"
              loading="lazy"
              style="color: transparent;"
            />
          </div>
          <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <div
              class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
            />
            <a href="https://amc-ma.org/"
              ><span
                class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
              /><span class="relative z-10">Academia Maranhense de Ciências</span></a
            >
          </h2>
          <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 h-24 text-project">
            Blog da Academia Maranhense de Ciências
          </p>
          <p
            class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-sky-500 dark:text-zinc-200"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
              ><path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
              /></svg
            ><span class="ml-2">AMC</span>
          </p>
        </li>
        <li class="group relative flex flex-col items-start">
          <div
            class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full
            bg-white shadow-md shadow-zinc-800/5 ring-1
            ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
          >
            <img
              alt=""
              src="https://user-images.githubusercontent.com/65487235/157884383-1b75feb1-45d8-4430-b636-3f7e06577347.png"
              width="32"
              height="32"
              decoding="async"
              data-nimg="1"
              class="h-8 w-8 object-contain"
              loading="lazy"
              style="color: transparent;"
            />
          </div>
          <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <div
              class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
            />
            <a href="https://github.com/gabrielberthier/docker-compose-ghost-setup"
              ><span
                class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
              /><span class="relative z-10">Ghost Docker Compose</span></a
            >
          </h2>
          <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 h-24 text-project">
            Quick start docker compose that include Ghost blog, Nginx proxy with TLS/SSL and MySQL
            database. The intention is to get a general feel of depolying Ghost in production mode,
            where each component (Web, App & DB) are deployed seperately. This supports scaling and
            isolate failure (if any).
          </p>
          <p
            class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-sky-500 dark:text-zinc-200"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
              ><path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
              /></svg
            ><span class="ml-2">Ghost Compose</span>
          </p>
        </li>
        <li class="group relative flex flex-col items-start">
          <div
            class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full
            bg-white shadow-md shadow-zinc-800/5 ring-1
            ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
          >
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Amazon-S3-Logo.svg/1200px-Amazon-S3-Logo.svg.png"
              width="32"
              height="32"
              decoding="async"
              data-nimg="1"
              class="h-8 w-8"
              loading="lazy"
              style="color: transparent;"
            />
          </div>
          <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <div
              class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
            />
            <a href="https://github.com/gabrielberthier/s3-zip-objects"
              ><span
                class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
              /><span class="relative z-10">Zip Objects From S3</span></a
            >
          </h2>
          <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 h-24 text-project">
            A package to handle S3 upload and download using PSR-7 interfaces, async operations and
            Zip download.
          </p>
          <p
            class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-sky-500 dark:text-zinc-200"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
              ><path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
              /></svg
            ><span class="ml-2">PHP S3 Zipper</span>
          </p>
        </li>
        <li class="group relative flex flex-col items-start">
          <div
            class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full
            bg-white shadow-md shadow-zinc-800/5 ring-1
            ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
          >
            <img
              alt=""
              src="https://gkpb.com.br/wp-content/uploads/2021/05/nubank-novo-logo-1024x1024.png"
              width="32"
              height="32"
              decoding="async"
              data-nimg="1"
              class="h-8 w-8"
              loading="lazy"
              style="color: transparent;"
            />
          </div>
          <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <div
              class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
            />
            <a href="https://github.com/gabrielberthier/nu-python-csv"
              ><span
                class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
              /><span class="relative z-10">Nu Python CSV</span></a
            >
          </h2>
          <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 h-24 text-project">
            A Python library to parse and collect data from nubank invoices/bank statements (in csv
            format) using pandas, multi-threading, parallelism and filesystem.
          </p>
          <p
            class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-sky-500 dark:text-zinc-200"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
              ><path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
              /></svg
            ><span class="ml-2">NU Python CSV</span>
          </p>
        </li>
        <li class="group relative flex flex-col items-start">
          <div
            class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full
            bg-white shadow-md shadow-zinc-800/5 ring-1
            ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
          >
            <img
              alt=""
              src="https://img.freepik.com/vetores-premium/icone-de-linha-de-vetor-de-passagem-de-cracha-cartao-de-identidade-para-acesso-ao-trabalho_92753-6375.jpg"
              width="32"
              height="32"
              decoding="async"
              data-nimg="1"
              class="h-8 w-8"
              loading="lazy"
              style="color: transparent;"
            />
          </div>
          <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <div
              class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
            />
            <a href="https://github.com/gabrielberthier/php-rbac"
              ><span
                class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
              /><span class="relative z-10">PHP RBAC</span></a
            >
          </h2>
          <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 h-24 text-project">
            A PHP package implementing PSR-15 middlewares to use RBAC as a security control.
          </p>
          <p
            class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-sky-500 dark:text-zinc-200"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
              ><path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
              /></svg
            ><span class="ml-2">RBAC in PHP</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</div>

<style lang="scss">
  .text-project {
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
