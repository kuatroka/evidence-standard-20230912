<script>
  export let quarters3 = [ 
    "1999Q1",
    "1999Q2",
    "1999Q3",
    "2000Q3",
    "2015Q1",
    "2023Q2",
    "2023Q3", 
    "2023Q4"
  ];	
	

  let sliderValue3 = quarters3.length - 1; // Initial slider value
	export let quarterValue3 = quarters3[quarters3.length - 1];

  function handleInput3(event) {
    sliderValue3 = event.target.value;
  }
	$: quarterValue3 = quarters3[sliderValue3]

</script>

<div class="p-2 w-full font-sans text-sm rounded-md">
  <label for="rangeInput">
    <!-- Quarter: {quarters[sliderValue]} -->
  </label>

  <input 
    id="rangeInput"
    type="range" 
    min="0"
    max={quarters3.length - 1}
    bind:value={sliderValue3}
    on:input={handleInput3}
    style="width: 100%;
    accent-color: goldenrod;
    background-color: #6496bf;"
  >
</div>
