<script>

</script>

<template>
    <div>
        <Header>
            <slot name="nav"></slot>
        </Header>
        <Alert></Alert>
        <slot />
    </div>
</template>