<template>
	<div class="afterparty">
		<div class="afterparty__gallery"></div>
		<horizontal-banner>
			<div class="afterparty__quote">
				<figure>
					<blockquote>
						<p>
							<span>
								The dancefloor is where the root of my ideas spring from. I
								can't count how many times I have been inspired by beautiful
								people having a great time.
							</span>
						</p>
					</blockquote>
					<figcaption>
						<cite><span>- Ditte Reffstrup</span></cite>
					</figcaption>
				</figure>
			</div>
		</horizontal-banner>
	</div>
</template>
    
<script>
import HorizontalBanner from '~/components/content/HorizontalBanner.vue'

export default {
	name: 'afterparty',
	components: {
		HorizontalBanner,
	},
}
</script>