<template>
    <div class="loader">
        <div class="loader-inner-1"></div>
        <div class="loader-inner-2"></div>
        <div class="loader-inner-3"></div>
        <div class="loader-inner-4"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
.loader {
    width: 100px;
    height: 100px;
    position: relative;
}

.loader-inner-1,
.loader-inner-2,
.loader-inner-3,
.loader-inner-4 {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
}

.loader-inner-1::before,
.loader-inner-2::before,
.loader-inner-3::before,
.loader-inner-4::before {
    position: absolute;
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    right: 0;
    animation: loading-1 2s infinite;
    background: linear-gradient(#4338ca, #4338ca);
}

.loader-inner-1 {
    top: 0;
    left: 0;
    transform: rotate(70deg);
}

.loader-inner-2 {
    top: 0;
    right: 0;
    transform: rotate(160deg);
}

.loader-inner-3 {
    bottom: 0;
    right: 0;
    transform: rotate(-110deg);
}

.loader-inner-4 {
    bottom: 0;
    left: 0;
    transform: rotate(-20deg);
}

@keyframes loading-1 {
    0% {
        width: 20px;
        right: 0;
    }

    30% {
        width: 120px;
        right: -100px;
    }

    60% {
        width: 20px;
        right: -100px;
    }
}
</style>