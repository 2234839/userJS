import type { domRule, resRule } from "../config";

type domHandler = Required<domRule>["处理函数"];
type resHandler = Required<resRule>["处理函数"];
export const 知乎答案不见: domHandler = function (el, data, f) {
  const user = el.querySelector<HTMLAnchorElement>(".UserLink-link");
  if (user) {
    data.forEach((s) => {
      const [id] = s.split(",");
      if (id !== "" && user.href.endsWith(id)) {
        el.classList.add(f.色块5px);
      }
    });
  }
};

export const 知乎推荐不见: resHandler = function (config, res, data) {
  if (Array.isArray(config)) {
    const [url] = config;
    if (
      typeof url === "string" &&
      url.startsWith("/api/v3/feed/topstory/recommend")
    ) {
      const response = res as {
        data: {
          id: "30_1616592551.6";
          type: "feed";
          offset: 30;
          verb: "TOPIC_ACKNOWLEDGED_ANSWER";
          created_time: 1616592551;
          updated_time: 1616592551;
          target: {
            id: 1795271929;
            type: "answer";
            url: "https://api.zhihu.com/answers/1795271929";
            author: {
              id: "7a792ac2b2452859f2b757f98b48b04c";
              type: "people";
              url: "https://api.zhihu.com/people/7a792ac2b2452859f2b757f98b48b04c";
              user_type: "people";
              url_token: "liu-guang-yu-89";
              name: "流光羽";
              headline: "中医黑，比特黑，目送各路韭菜走好。";
              avatar_url: "https://pic2.zhimg.com/50/v2-b4ba989188f86de9e9e2c7451ca49704_m.jpg";
              is_org: false;
              gender: 1;
              badge: [];
              followers_count: 312;
              is_following: false;
              is_followed: false;
            };
            created_time: 1616477444;
            updated_time: 1616477498;
            voteup_count: 108;
            thanks_count: 2;
            comment_count: 57;
            is_copyable: true;
            question: {
              id: 448972380;
              type: "question";
              url: "https://api.zhihu.com/questions/448972380";
              author: {
                id: "3f09e6797bfdee139f75c94bdb2a664e";
                type: "people";
                url: "https://api.zhihu.com/people/3f09e6797bfdee139f75c94bdb2a664e";
                user_type: "people";
                url_token: "feng-feng-30-29-90";
                name: "风风";
                headline: "";
                avatar_url: "https://pic4.zhimg.com/50/v2-fac68c92ac2343e8bc941d7b9489e784_m.jpg";
                is_org: false;
                gender: 0;
                badge: [];
                followers_count: 9;
                is_following: false;
                is_followed: false;
              };
              title: "西医很多保健品都是骗人的，为什么没人借此来全盘否定西医？";
              created: 1615542790;
              answer_count: 32;
              follower_count: 36;
              comment_count: 3;
              bound_topic_ids: [5745, 6289, 13182];
              is_following: false;
              excerpt: "";
              relationship: {
                is_author: false;
              };
              detail: "";
              question_type: "normal";
            };
            thumbnail: "";
            excerpt: "真是一个好问题，充分展示了中医粉的认知能力和逻辑水平。 1、从提问可以看出，题主认为不少中医黑全盘否定中医的诱因，是因为中医很多保健品都是骗人的。 这个认知本身就经不起检验，因为我在知乎这么长时间，从未见过哪怕一个中医黑全盘否定中医的原因是因为&ldquo;中医很多保健品都是骗人的&rdquo;。 2、即使西医很多保健品都是骗人的，我也不会产生借此全盘否定西医的想法，因为中医黑普遍没有以偏概全的毛病。 3、关于&ldquo;西医很多保健&hellip;";
            excerpt_new: "真是一个好问题，充分展示了中医粉的认知能力和逻辑水平。 1、从提问可以看出，题主认为不少中医黑全盘否定中医的诱因，是因为中医很多保健品都是骗人的。 这个认知本身就经不起检验，因为我在知乎这么长时间，从未见过哪怕一个中医黑全盘否定中医的原因是因为&ldquo;中医很多保健品都是骗人的&rdquo;。 2、即使西医很多保健品都是骗人的，我也不会产生借此全盘否定西医的想法，因为中医黑普遍没有以偏概全的毛病。 3、关于&ldquo;西医很多保健&hellip;";
            preview_type: "default";
            preview_text: "";
            reshipment_settings: "allowed";
            content: "<p>真是一个好问题，充分展示了中医粉的认知能力和逻辑水平。</p><p>1、从提问可以看出，题主认为不少中医黑全盘否定中医的诱因，是因为中医很多保健品都是骗人的。</p><p>这个认知本身就经不起检验，因为我在知乎这么长时间，从未见过哪怕一个中医黑全盘否定中医的原因是因为“中医很多保健品都是骗人的”。</p><p>2、即使西医很多保健品都是骗人的，我也不会产生借此全盘否定西医的想法，因为中医黑普遍没有以偏概全的毛病。</p><p>3、关于“西医很多保健品都是骗人的”这个论断，请题主给出几个例子，否则就是信口开河，再一次展示了中医粉的传统艺能。</p><p>4、我黑中医的原因，是因为阴阳五行至今无法自证、无法检验。并不是我喜欢一上来就全盘否定中医，而是你中医“阴阳五行”这个基本盘的神棍造型本身就招黑。</p><p>5、如果题主想跟自己眼中的中医黑一样不讲武德，一上来就全盘否定西医，我是非常欢迎的，理、化、生随便你黑，根本不要求你拿“西医有很多保健品都是骗人的”为借口。</p><p>提一个问题能暴露出各种逻辑问题，不仅不自知，还能理直气壮地发到知乎上，这就是中医粉之所以会成为中医粉，并且将一直中医粉下去的根本原因。</p>";
            mark_infos: [];
            relationship: {
              is_thanked: false;
              is_nothelp: false;
              voting: 0;
              upvoted_followee_ids: [];
            };
            is_labeled: false;
            visited_count: 2214;
          };
          brief: '{"source": "TS", "type": "answer", "id": 1795271929}';
          uninterest_reasons: [
            {
              reason_id: 3;
              reason_type: "topic";
              object_token: "19567421";
              object_type: "topic";
              reason_text: "保健品";
            },
            {
              reason_id: 3;
              reason_type: "topic";
              object_token: "19569062";
              object_type: "topic";
              reason_text: "西医";
            },
            {
              reason_id: 3;
              reason_type: "topic";
              object_token: "19589827";
              object_type: "topic";
              reason_text: "西药";
            },
            {
              reason_id: 2;
              reason_type: "creator";
              object_token: "7a792ac2b2452859f2b757f98b48b04c";
              object_type: "people";
              reason_text: "流光羽创作的内容";
            },
          ];
          attached_info: "CpkCCIGOnYGgoKeT/gEQBBoJMzU2NDkzMjM5IIT65YIGKGwwOUAeSg0KBEhDWlYSATEYACAAUg5ob3RfYWRkX2Fuc3dlcloINjIwNTA1ODFyCjE3OTUyNzE5Mjl4OooBCTQ0ODk3MjM4MKoBCXJlY29tbWVuZPIBNQgAEjFydzo2LjA7aXNvOjAuMDtiaTowLjA7Y3I6MC4wO3J1bGVzOkN1cnJlbmN5UmFua2Vy8gEFCAsSATbyAQoIDBIGTm9ybWFs8gEoCAoSJGFmZGFjODg0LWEwYTUtNGQxMy04ZjFmLWIzYzdiNDU4ZGIwZIgCqv6yo4YvkgIgN2E3OTJhYzJiMjQ1Mjg1OWYyYjc1N2Y5OGI0OGIwNGOaAgA=";
          actors: [
            {
              id: "19567421";
              type: "topic";
              url: "https://api.zhihu.com/topics/19567421";
              avatar_url: "https://pic4.zhimg.com/50/e82bab09c_s.jpg";
              name: "保健品";
              excerpt: "";
              introduction: "";
            },
          ];
          show_actor_time: false;
          action_text: "保健品";
          action_text_tpl: "热门内容, 来自: {}";
          action_card: false;
        }[];
      };
      response.data = response.data.filter((el) => {
        const id = data.map((s) => s.split(",")[0]);
        const author = el.target.author;
        const f = false === id.includes(author.url_token);
        // const f = author.url_token.length < 20;//测试用的
        if (!f) {
          console.log(`拦截推荐中的 ${author.url_token}-${author.name} 的回答`);
        }
        return f;
      });
      // console.log("[response.data]", response.data);
    }
  } else {
    // console.log(config);
  }
};
