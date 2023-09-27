<script>
  export let quarters = [];	
	

  export let sliderValue = quarters.length - 1; // Initial slider value
	export let quarterValue = quarters[sliderValue];

  function handleInput(event) {
    sliderValue = event.target.value;
  }
	$: quarterValue = quarters[sliderValue]

</script>

<div class="p-2 w-full font-sans text-sm rounded-md">
  <label for="rangeInput">
    <!-- Quarter: {quarters[sliderValue]} -->
  </label>

  <input 
    id="rangeInput"
    type="range" 
    min="0"
    max={quarters.length - 1}
    bind:value={sliderValue}
    on:input={handleInput}
    style="width: 100%;
    accent-color: goldenrod;
    background-color: #6496bf;"
  >
</div>
