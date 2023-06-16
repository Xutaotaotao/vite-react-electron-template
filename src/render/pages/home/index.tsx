import type { FC } from "react";
import { Avatar, Card, Skeleton, Statistic,Divider } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import "./style.less";
import { useAuth } from "@/render/auth";

const { Meta } = Card;

export type CurrentUser = {
  name: string;
  avatar: string;
  userid: string;
  email: string;
  signature: string;
  title: string;
  group: string;
  notifyCount: number;
  unreadCount: number;
  country: string;
  address: string;
  phone: string;
};

const projectNotice = [
  {
    id: "xxx1",
    title: "Alipay",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
    description: "那是一种内在的东西，他们到达不了，也无法触及的",
    updatedAt: "2023-06-07T03:16:32.596Z",
    member: "科学搬砖组",
    href: "",
    memberLink: "",
  },
  {
    id: "xxx2",
    title: "Angular",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
    description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
    updatedAt: "2017-07-24T00:00:00.000Z",
    member: "全组都是吴彦祖",
    href: "",
    memberLink: "",
  },
  {
    id: "xxx3",
    title: "Ant Design",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
    description: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
    updatedAt: "2023-06-07T03:16:32.596Z",
    member: "中二少女团",
    href: "",
    memberLink: "",
  },
  {
    id: "xxx4",
    title: "Ant Design Pro",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
    description: "那时候我只会想自己想要什么，从不想自己拥有什么",
    updatedAt: "2017-07-23T00:00:00.000Z",
    member: "程序员日常",
    href: "",
    memberLink: "",
  },
  {
    id: "xxx5",
    title: "Bootstrap",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
    description: "凛冬将至",
    updatedAt: "2017-07-23T00:00:00.000Z",
    member: "高逼格设计天团",
    href: "",
    memberLink: "",
  },
  {
    id: "xxx6",
    title: "React",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
    description: "生命就像一盒巧克力，结果往往出人意料",
    updatedAt: "2017-07-23T00:00:00.000Z",
    member: "骗你来学计算机",
    href: "",
    memberLink: "",
  },
];

const gridStyle: React.CSSProperties = {
  width: "33%",
  textAlign: "center",
};

function Home() {
  const auth = useAuth()

  const PageHeaderContent = () => {
    if (!auth) {
      return <Skeleton avatar paragraph={{ rows: 1 }} active />;
    }
    return (
      <div className="pageHeaderContent">
        <div className="avatar">
          <Avatar size="large" src={auth?.user?.avatar} />
        </div>
        <div className="content">
          <div className="contentTitle">
            {auth?.user?.name}
            ，祝你开心每一天！
          </div>
          <div>
            {auth?.user?.title}<Divider type="vertical" />{auth?.user?.group}
          </div>
        </div>
      </div>
    );
  };

  const ExtraContent: FC<Record<string, any>> = () => (
    <div className="extraContent">
      <div className="statItem">
        <Statistic title="项目数" value={56} />
      </div>
    </div>
  );
  return (
    <div>
      <PageContainer
        content={
          <PageHeaderContent />
        }
        extraContent={<ExtraContent />}
      />
      <Card title="进行中的项目" bordered={false}>
        {projectNotice.map((item) => (
          <Card.Grid style={gridStyle} key={item.id}>
            <Card
              bodyStyle={{padding:'10px',minHeight:'100px'}}
              bordered={false}
              title={
                  <Avatar size="small" src={item.logo} />
              }
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
}

export default Home;
