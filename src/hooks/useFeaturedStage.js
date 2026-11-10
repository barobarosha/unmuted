import { useSwapStage } from './useSwapStage.js'

/** 精选作品的换片舞台：末尾留两成行程给最后一张停住 */
export function useFeaturedStage(count) {
  return useSwapStage(count, {
    viewport: '.featuredviewport',
    slide: '.featuredslide',
    rail: '.featuredprogress',
    tail: 0.2
  })
}
