<template>
  <div class=''>
    <!-- 顶部banner -->
    <div class="carousel">
      <el-carousel trigger="click" :autoplay="true" height="500px">
        <el-carousel-item v-for="barnner in banners" :key="barnner.sort">
          <img :src="barnner.bannerUrl" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="container marketing">
      <!-- 横向介绍 -->
      <div class="row">
        <div class="col-lg-4" v-for="n in 3" :key="n">
          <img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
          <h2>标题文字</h2>
          <p>一堆废话的内容</p>
          <p><a class="btn btn-secondary" href="#" role="button">详情按钮 &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->

      <!-- START THE FEATURETTES -->
      <hr class="featurette-divider">

      <div v-for="n in 2" :key="n">
        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">{{n}}部分内容 <span class="text-muted">保持冷静.</span></h2>
            <p class="lead">说说你是怎么保持冷静的</p>
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-fluid mx-auto" src="static/temp/home-1.svg" alt="Generic placeholder image">
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading">{{n}}部分内容 <span class="text-muted">保持冷静</span></h2>
            <p class="lead">说说你是怎么保持冷静的</p>
          </div>
          <div class="col-md-5 order-md-1">
            <img class="featurette-image img-fluid mx-auto" src="static/temp/home-1.svg" alt="Generic placeholder image">
          </div>
        </div>

        <hr class="featurette-divider">
      </div>
      <!-- /END THE FEATURETTES -->
    </div><!-- /.container -->
  </div>
</template>
<script>
export default {
  name: 'first-content',
  title: '首页',
  data() {
    return {
      banners: [
        {bannerUrl: 'static/temp/banner1.jpg', sort: '1'},
        {bannerUrl: 'static/temp/banner2.jpg', sort: '2'},
        {bannerUrl: 'static/temp/banner3.jpg', sort: '3'}
      ],
    }
  }
}
</script>
<style lang="scss">
  .carousel {
    margin-bottom: 4rem;
  }
  /* Center align the text within the three columns below the carousel */
  .marketing {
    .col-lg-4 {
      margin-bottom: 1.5rem;
      text-align: center;
      p {
        margin-right: .75rem;
        margin-left: .75rem;
      }
    }
    h2 {
      font-weight: 400;
    }
  }
  /* Featurettes
  ------------------------- */
  .featurette-divider {
    margin: 5rem 0; /* Space out the Bootstrap <hr> more */
  }

  /* Thin out the marketing headings */
  .featurette-heading {
    font-weight: 300;
    line-height: 1;
    letter-spacing: -.05rem;
  }

  /* RESPONSIVE CSS
  -------------------------------------------------- */
  @media (min-width: 40em) {
    /* Bump up size of carousel content */
    .carousel-caption p {
      margin-bottom: 1.25rem;
      font-size: 1.25rem;
      line-height: 1.4;
    }

    .featurette-heading {
      font-size: 50px;
    }
  }

  @media (min-width: 62em) {
    .featurette-heading {
      margin-top: 7rem;
    }
  }
</style>
