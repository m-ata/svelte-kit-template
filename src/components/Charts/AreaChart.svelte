<script lang="ts">
  import { onMount } from "svelte";
  // @ts-ignore
  import Chart from "chart.js";
  import { _ } from "svelte-i18n";

  import { stats } from "$lib/store/stats.store";
  import type { TStats } from "$lib/types/stats.type";
  import { FISH_COLORS } from "$lib/constants";

  const data: TStats = $stats as TStats;

  const chartData = {
    labels: data.labels,
    datasets: data?.datasets?.map((stat) => ({
      label: $_(`_common.ui.fishSpecies.${stat.label}`),
      data: stat.data?.map(
        (record: { caught: any; released: any }) =>
          +record.caught + record.released
      ),
      backgroundColor: FISH_COLORS[stat.label],
    })),
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  function createChart() {
    var ctx = document.getElementById("areaChart");
    // @ts-ignore
    // @ts-ignore
    new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });
  }

  onMount(createChart);
</script>

<canvas id="areaChart" />
