<script>

</script>

<template>
    <div>
        <Header>
            <slot name="nav"></slot>
        </Header>
        <Alert></Alert>
        <Loading></Loading>
        <slot />
    </div>
</template>