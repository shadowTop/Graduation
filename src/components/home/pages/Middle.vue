<template lang="pug">
el-row#middle(:span=24)
	el-col.item(v-for="i in 3" :key="i" :span=7)
		el-row.wrap(:style="{borderBottomColor:bottomColor[i-1]}"): img(:src="i|getImg")
		el-row.content(class="aTitle" v-html="infos[i-1]")
	icon-arrow
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import IconArrow from "~/icons/IconArrow";
@Component({
	components: {
		IconArrow,
	},
	filters: {
		getImg: function (i) {
			return require(`img/icon${i++}.png`);
		},
	},
})
export default class MainMiddle extends Vue {
	infos = [
		"<p>物联网云监控系统</p><br/><p>一个全新的生活方式</p>",
		"<p>全方位的家居环境监测控制系统</p><br/><p>给您带来便捷的服务</p>",
		"<p>体验升级</p>",
	];
	bottomColor = ["#5cb8de", "#ea7676", "#77d8cc"];
}
</script>

<style lang="stylus">

#middle
	height 100vh
	min-height 100vh
	width 100vw
	min-width 100vw
	overflow hidden

	.item
		height 70vh
		padding 2vh
		padding-top 7vh
		box-shadow -1px 5px 20px 1px #b9b5b5
		border-radius 2%
		margin 3vh 2vw
		for $item in 1..3
			opacity 0
			transform scale(0.3)
			&:nth-child({$item})
				animation-delay $item*0.2s !important
				animation toBig 0.7s ease-out forwards

		.wrap
			size = 23vh
			height size
			width size
			line-height size
			text-align center
			border-radius 50%
			background #fefefe
			box-shadow 0 1px 20px 0px #c5c0c0
			border solid 5px transparent
			transition: all 2s .2s ease-in-out
			&:hover
				transform: rotate(720deg) scale(1.1)
			img
				vertical-align middle
		.content
			padding 2vw
			margin-top 5vh
			height 43vh
			width 100%
			min-width 100%
@keyframes toBig
	to
		opacity 1
		transform scale(1)
</style>
