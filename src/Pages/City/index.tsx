import { Line } from "@ant-design/charts";
import { Card, Col, Flex, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { allCityPriceData } from "./data";
import { Typography } from "antd";

const { Text } = Typography;

const maxSelectedCities = 3;

export const CityPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "北京",
    "上海",
  ]);
  const [chartData, setChartData] = useState<any[]>([]);

  const generateCityPriceChartData = () => {
    const chartData: any[] = [];
    // 为选中的城市生成数据
    allCityPriceData.forEach((city) => {
      if (!selectedCities.includes(city.city)) {
        return;
      }

      city.data.forEach((item: any) => {
        chartData.push({
          month: item.month,
          price: item.price,
          city: city.city,
        });
      });
    });

    // 按月份排序
    return chartData.sort((a, b) => {
      const monthA = parseInt(a.month);
      const monthB = parseInt(b.month);
      return monthA - monthB;
    });
  };

  useEffect(() => {
    const data = generateCityPriceChartData();
    setChartData(data);
    setLoading(false);
  }, [selectedCities]);

  // readCityCSVData("guangzhou", "广州").then((data) => {
  //   console.log(data);
  // });

  const lineConfig: any = {
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
    tooltip: {
      channel: "y",
      valueFormatter: (d: any) => `${d}元/m²`,
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
          <Text strong className="text-2xl ml-2">
            城市房价
          </Text>
          <Text className="text-sm ml-2 text-blue-500 font-normal">
            ({`数据来源于网络, 仅供参考, 更新时间: 2025-07-27`})
          </Text>
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card
              title={
                <Flex justify="space-between" align="center" gap={8}>
                  <Text strong>价格走势</Text>
                  <Select
                    mode="multiple"
                    value={selectedCities}
                    onChange={(values) => {
                      // 限制最多选择3个城市
                      if (values.length <= maxSelectedCities) {
                        setSelectedCities(values);
                      } else {
                        // 如果超过3个，则移除第一个，并添加新的
                        const newValues = values.slice(1, maxSelectedCities);
                        newValues.push(values[values.length - 1]);
                        setSelectedCities(newValues);
                      }
                    }}
                    style={{ width: 400 }}
                    placeholder={`选择城市（最多${maxSelectedCities}个）`}
                    maxTagCount={maxSelectedCities}
                    maxTagTextLength={maxSelectedCities}
                    options={allCityPriceData.map((city) => ({
                      label: city.city,
                      value: city.city,
                    }))}
                  />
                </Flex>
              }
            >
              <Row gutter={[16, 16]}></Row>
              <Line {...lineConfig} />
            </Card>
          </Col>
        </Row>
      </Flex>
    </Spin>
  );
};
