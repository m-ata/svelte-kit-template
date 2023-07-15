<script lang="ts">
  import Chart from "chart.js";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import { stats } from "$lib/store/stats.store";
  import type { TStats } from "$lib/types/stats.type";
  import { FISH_COLORS } from "$lib/constants";

  const data: TStats = $stats as TStats;

  const chartData = {
    labels: data.datasets?.map((stat) =>
      $_(`_common.ui.fishSpecies.${stat.label}`)
    ),
    datasets: [
      {
        label: "# of Votes",
        data: data.datasets?.flatMap((stat) =>
          stat.data?.map(
            (record: { caught: any; released: any }) =>
              record.caught + record.released
          )
        ),
        backgroundColor: data.datasets?.map((stat) => FISH_COLORS[stat.label]),
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  function createChart() {
    var ctx = document.getElementById("pieChart");
    // @ts-ignore
    new Chart(ctx, {
      type: "pie",
      data: chartData,
      // options: chartOptions
    });
  }

  onMount(createChart);
</script>

<canvas id="pieChart" />
