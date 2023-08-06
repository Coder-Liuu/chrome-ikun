// 从 storage 中获取开关状态
chrome.storage.local.get("scriptEnabled", result => {
  console.log("鸡你太美")
  if (result.scriptEnabled) {
    init();
  }
});

const cxkCoverURL = '//i1.hdslb.com/bfs/archive/247c08cb8ccba38d6116b76f012dff33b9eb6c0b.jpg@672w_378h_1c_!web-search-common-cover';
const cxkVideoURL = "https://www.bilibili.com/video/BV1ct4y1n7t9/"

function init() {
  // 创建一个MutationObserver实例
  const observer_mark = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // 首页基本视频
        const pictures = document.querySelectorAll('.bili-video-card__wrap');
        pictures.forEach(item => {
          // 处理封面
          const sources = item.querySelectorAll('picture.v-img.bili-video-card__cover source');
          sources.forEach(source => {
            source.setAttribute('srcset', cxkCoverURL);
          });
          // 跳转到蔡徐坤网址
          const a = item.querySelector("a");
          a.setAttribute("href", cxkVideoURL);


          // 时长必须是两分半
          const titles = item.querySelectorAll('.bili-video-card__info--tit');
          titles.forEach(title => {
            const a = title.querySelector("a")
            if (a) {
              a.textContent = "【蔡徐坤】 鸡你太美 4k高清"
            }
          })
          const durations = item.querySelectorAll('.bili-video-card__stats__duration');
          durations.forEach(duration => {
            duration.textContent = "02:30"
          })

          // 添加西瓜小兵
          const author_url = item.querySelector(".bili-video-card__info--owner")
          if(author_url) {
            author_url.setAttribute("href", "https://space.bilibili.com/393128277")
          }

          const author_text = item.querySelector(".bili-video-card__info--author")
          if(author_text) {
            author_text.textContent = "西瓜小兵儿"
          }
        });


        // 去掉直播
        const order_video = document.querySelectorAll('.cover-shim > picture.v-img');
        order_video.forEach(video => {
          const sources = video.querySelectorAll('source');
          sources.forEach(source => {
            source.setAttribute('srcset', cxkCoverURL);
          });
        })
        // 首页轮播图
        const carousel_inner = document.querySelectorAll('.carousel-inner > .v-img');
        carousel_inner.forEach(picture => {
          const sources = picture.querySelectorAll('source');
          sources.forEach(source => {
            source.setAttribute('srcset', cxkCoverURL);
          });
        });
        // 视频详情页面也都改成蔡徐坤
        const relate_video = document.querySelectorAll('a > .b-img > .b-img__inner');
        relate_video.forEach(picture => {
          const sources = picture.querySelectorAll('source');
          sources.forEach(source => {
            source.setAttribute('srcset', cxkCoverURL);
          });
        });
        // 求求了，点个赞吧
      }
    }
  });

  // 配置观察选项
  const config = { childList: true, subtree: true };

  // 监听DOM树的变化
  observer_mark.observe(document.body, config);
}
