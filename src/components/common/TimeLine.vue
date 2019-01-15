<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>
<script>
  const prefixCls = 'timeline'
  export default {
    name: 'Timeline',
    props: {
      pending: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-pending`]: this.pending
          }
        ]
      }
    }
  }
</script>
<style>
  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .timeline-item {
    margin: 0!important;
    padding: 0 0 12px;
    list-style: none;
    position: relative;
  }
  .timeline-item-tail {
    height: 100%;
    border-left: 3px solid #BAC1B0;
    position: absolute;
    left: 8px;
    top: 0;
  }
  .timeline-item-tail-green {
    border-color: #94C05A;
  }
  .timeline-item-head-default {
    border-color: #C0C0C0;
    color: #C0C0C0;
  }
  /* 蓝色 */
  .timeline-item-head-blue {
    border-color: #2d8cf0;
    color: #2d8cf0;
  }
  /* 绿色 */
  .timeline-item-head-green {
    border-color: #94C05A;
    color: #94C05A;
  }
  /* 红色 */
  .timeline-item-head-red {
    border-color: #ed3f14;
    color: #ed3f14;
  }
  .timeline-item-head {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    border: 3px solid;
    position: absolute;
  }
  .timeline-item-content {
    padding: 1px 1px 10px 24px;
    font-size: 12px;
    position: relative;
    top: -3px;
  }
  .timeline-item:last-child .timeline-item-tail {
    display: none;
  }
</style>
