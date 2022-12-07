<template>
	<div class="advanced-table">
		<div class="advanced-form" v-if="slots.form">
			<slot name="form"></slot>
		</div>
		<div class="advanced-box">
			<div class="btn-top" v-if="slots.btns">
				<slot name="btns"></slot>
			</div>
			<slot name="table"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<style lang="less" scoped>
.advanced-table {
	display: flex;
	flex-flow: column nowrap;
	height: 100%;

	.advanced-form {
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0px 0px 9px 0px #efefef;
		padding: 15px 20px 5px 10px;
		display: flex;
		flex-flow: column nowrap;
		margin-bottom: 10px;
		:deep(.ant-form-item) {
			margin-bottom: 8px;
		}
	}

	.advanced-box {
		width: 100%;
		flex: 1;
		overflow: auto;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0px 0px 9px 0px #efefef;

		.btn-top {
			padding: 10px 16px;
		}
	}
}
</style>
