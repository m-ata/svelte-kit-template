<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { setTabConfig } from "$lib/utils/tabs-config.util";
  import BarChart from '../../components/Charts/BarChart.svelte';
  import AreaChart from '../../components/Charts/AreaChart.svelte';
  import PieChart from '../../components/Charts/PieChart.svelte';
  import { fetchData } from "$lib/api/api";

  onMount(() => {
    setTabConfig("/dashboard");
    fetchData();
  });
</script>

<svelte:head>
  <title>{$_("_page.home.title")}</title>
  <meta name="description" content="Svelte demo app" />
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<section>
  <div>
    <AreaChart />
  </div>
  <div>
    <BarChart />
  </div>
  
</section>

<style lang="scss">
  section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    overflow: scroll;
    height: calc(100vh - 135px);
    div {
      width: 50%;
      padding: 8px;
    }
  }
</style>
