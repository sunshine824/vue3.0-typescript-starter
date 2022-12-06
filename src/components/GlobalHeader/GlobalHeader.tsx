import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'

import styles from './index.module.less'

const GlobalHeader = defineComponent({
	name: 'GlobalHeader',
	setup(props, { slots }) {
		return () => (
			<div class={styles['header-animat']}>
				<Layout.Header>
					{slots.leftContent?.()}
					<div class={styles['right-con']}>{slots.content?.()}</div>
				</Layout.Header>
			</div>
		)
	}
})

export default GlobalHeader
