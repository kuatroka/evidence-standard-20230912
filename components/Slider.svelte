<script>
    export let quarterValue = 0;
    export let quarters = [];
</script>

<div class="p-2 w-full font-sans text-sm rounded-md">
    <label for="rangeInput"></label>
    <input type="range" min={0} max={quarters.length - 1}
    bind:value={quarterValue}
    style="width: 100%;
    accent-color: goldenrod;
    background-color: #6496bf;" />
    </div>






<!-- <Slider bind:quarters={quarters3} bind:quarterValue={sliderValue3} /> -->
<!-- RangeInputYear3
<div class="p-2 w-full font-sans text-sm rounded-md">
<label for="rangeInput"></label>
<input type="range" min={0} max={quarters3.length - 1}
bind:value={sliderValue3}
style="width: 100%;
accent-color: goldenrod;
background-color: #6496bf;" />
</div> -->