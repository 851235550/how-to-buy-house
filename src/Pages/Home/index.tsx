import {
  Row,
  Typography,
  Card,
  Col,
  Flex,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
  Divider,
} from "antd";
import { HomeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";
import { useState, useEffect } from "react";
import { citys } from "./utils";
import dayjs from "dayjs";
import { cityDatas } from "./data";

const { Text } = Typography;

const maxSelectedCities = 5;

const columns = [
  {
    title: "城市",
    dataIndex: "city",
  },
  {
    title: "最新月份",
    dataIndex: "month",
  },
  {
    title: "环比(上月=100)",
    dataIndex: "hb",
  },
  {
    title: "同比(去年同月=100)",
    dataIndex: "tb",
  },
  {
    title: "今年以来平均(上年同期=100)",
    dataIndex: "currAvg",
  },
  {
    title: "相比 2022-05 涨跌幅",
    dataIndex: "cur",
    render: (_: number, record: any) => {
      const down = Number((record.cur - 100).toFixed(2));
      if (down < 0) {
        return <Tag color="green">{down}%</Tag>;
      } else if (down > 0) {
        return <Tag color="red">{down}%</Tag>;
      }
      return <Tag color="default">持平</Tag>;
    },
  },
];

const downTop10Columns = [
  {
    title: "城市",
    dataIndex: "city",
    sorter: (a: any, b: any) => a.city.localeCompare(b.city),
    defaultSortOrder: "ascend",
  },
  {
    title: (
      <>
        <Text className="mr-2">最新 / 2022-05 房价</Text>
        <Tooltip title="当前房价 / 2022-05 房价">
          <QuestionCircleOutlined className="text-sm" />
        </Tooltip>
      </>
    ),
    dataIndex: "cur",
    render: (text: number) => `${text} / 100`,
  },
  {
    title: "涨跌幅",
    dataIndex: "cur",
    sorter: (a: any, b: any) => a.cur - b.cur,
    render: (text: number) => {
      const down = Number((text - 100).toFixed(2));
      if (down < 0) {
        return <Tag color="green">{down}%</Tag>;
      } else if (down > 0) {
        return <Tag color="red">{down}%</Tag>;
      }
      return null;
    },
  },
];

export const HomePage = () => {
  const [allData, setAllData] = useState<
    Record<
      string,
      Record<string, { hb: number; tb: number; currAvg: number; cur: number }>
    >
  >({});
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "北京",
    "上海",
    "杭州",
    "深圳",
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setAllData(cityDatas);
      } catch (error) {
        console.error("加载数据失败:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 生成图表数据
  const generateChartData = () => {
    const chartData: any[] = [];

    Object.entries(allData).forEach(([fileName, fileData]: [string, any]) => {
      const month = fileName;

      // 为每个选中的城市生成数据
      selectedCities.forEach((cityName) => {
        const cityData = fileData[cityName];

        if (cityData && cityData.cur > 0) {
          // 确保有有效数据
          chartData.push({
            month,
            city: cityName,
            price: cityData.cur,
            hb: cityData.hb,
            tb: cityData.tb,
            currAvg: cityData.currAvg,
          });
        }
      });
    });

    // 按月份排序
    return chartData.sort((a, b) => {
      const monthA = parseInt(a.month);
      const monthB = parseInt(b.month);
      return monthA - monthB;
    });
  };

  const chartData = generateChartData();

  // 生成表格数据 - 选中城市的最新数据
  const generateTableData = () => {
    const tableData: any[] = [];

    // 获取最新的数据文件（按文件名排序后的最后一个）
    const latestMonth = Object.keys(allData).sort().pop();

    if (latestMonth) {
      const latestData = allData[latestMonth];

      selectedCities.forEach((cityName) => {
        const cityData = latestData[cityName];
        if (cityData) {
          tableData.push({
            key: cityName,
            city: cityName,
            month: dayjs(latestMonth).format("YYYY年MM月"),
            hb: cityData.hb,
            tb: cityData.tb,
            currAvg: cityData.currAvg,
            cur: cityData.cur,
          });
        }
      });
    }

    return tableData;
  };

  const generateDownTop10Data = () => {
    const downTop10Data: any[] = [];
    const latestMonth = Object.keys(allData).sort().pop();
    if (latestMonth) {
      const latestData = allData[latestMonth];
      const downTop10 = Object.entries(latestData).sort(
        (a, b) => b[1].cur - a[1].cur
      );
      downTop10.forEach(([city, data]) => {
        downTop10Data.push({
          key: city,
          city,
          cur: data.cur,
        });
      });
    }
    return downTop10Data;
  };

  const tableData = generateTableData();
  const downTop10Data = generateDownTop10Data();

  const lineConfig = {
    data: chartData,
    xField: "month",
    yField: "price",
    colorField: "city", // 按城市区分颜色
    shapeField: "smooth",
    scale: {
      y: {
        nice: true, // 自动调整刻度为美观的数值
      },
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    animate: { enter: { type: "pathIn", duration: 1000 } },
  };

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={16}>
        {/* 页面标题 */}
        <Row gutter={{ xs: 8 }} align="middle">
          <HomeOutlined className="text-2xl" />
          <Text strong className="text-2xl ml-2">
            购房指北
          </Text>
          <Text className="text-sm ml-2 text-blue-500 font-normal">
            (
            {`数据来源于国家统计局, 且以2022年5月为基准. 设定全部城市2022年5月房价为100. 持续更新中...`}
            )
          </Text>
        </Row>

        {/* 主要内容区域 */}
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card
              title={
                <Flex justify="space-between" align="center">
                  <Text strong className="text-lg">
                    房价走势
                  </Text>
                  <Select
                    mode="multiple"
                    value={selectedCities}
                    onChange={(values) => {
                      // 限制最多选择5个城市
                      if (values.length <= maxSelectedCities) {
                        setSelectedCities(values);
                      } else {
                        // 如果超过5个，则移除第一个，并添加新的
                        const newValues = values.slice(1, maxSelectedCities);
                        newValues.push(values[values.length - 1]);
                        setSelectedCities(newValues);
                      }
                    }}
                    style={{ width: 450 }}
                    placeholder={`选择城市（最多${maxSelectedCities}个）`}
                    maxTagCount={maxSelectedCities}
                    maxTagTextLength={maxSelectedCities}
                    options={citys.map((city) => ({
                      label: city,
                      value: city,
                    }))}
                  />
                </Flex>
              }
            >
              <Line {...lineConfig} />
              <Divider />
              <Table
                dataSource={tableData}
                columns={columns}
                pagination={false}
                key="tableData"
              />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={24}>
            <Card title="2022-05 至今70大中城市">
              <Table
                dataSource={downTop10Data}
                columns={downTop10Columns}
                pagination={false}
                key="downTop10Data"
              />
            </Card>
          </Col>
        </Row>
      </Flex>
    </Spin>
  );
};
