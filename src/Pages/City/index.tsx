import { Line } from "@ant-design/charts";
import {
  Button,
  Card,
  Col,
  Drawer,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { allCityPriceData } from "./data";
import { Typography } from "antd";

const { Text } = Typography;

const maxSelectedCities = 3;

interface MonthlyPayment {
  month: number;
  principal: number;
  payment: number;
  interest: number;
  remainingPrincipal: number;
}

interface LoanCalculationResult {
  monthlyPayments: MonthlyPayment[];
  totalRepay: number;
  totalInterest: number;
}

// 房贷计算器组件
const MortgageCalculator = ({}: { onClose: () => void }) => {
  const [form] = Form.useForm();
  const [monthlyPayment, setMonthlyPayment] = useState<MonthlyPayment[]>([]);
  const [totalRepay, setTotalRepay] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const repaymentMethod = Form.useWatch("repaymentMethod", form);

  // 监听还款方式变化，清空计算结果
  useEffect(() => {
    if (repaymentMethod) {
      setMonthlyPayment([]);
      setTotalRepay(0);
      setTotalInterest(0);
    }
  }, [repaymentMethod]);

  const loanYearsOptions = Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}年 (共${(i + 1) * 12}期)`,
    value: i + 1,
  }));

  const calculateLoan = (values: any): LoanCalculationResult => {
    const { price, area, downPayment, loanYears, loanRate, repaymentMethod } =
      values;

    const totalRepayment = price * area; // 总房价
    const loanAmount = totalRepayment - downPayment * 10000; // 总贷款
    const monthlyRate = loanRate === "0" ? 0 : loanRate / 100 / 12; // 月利率
    const totalMonths = loanYears * 12; // 总还款月数

    let monthlyPayments: MonthlyPayment[] = [];

    if (repaymentMethod === "equal") {
      // 等额本息
      let monthlyPayment: number;
      if (loanRate === "0") {
        monthlyPayment = Math.ceil((loanAmount / totalMonths) * 100) / 100;
      } else {
        monthlyPayment =
          Math.ceil(
            ((loanAmount * monthlyRate * (1 + monthlyRate) ** totalMonths) /
              ((1 + monthlyRate) ** totalMonths - 1)) *
              100
          ) / 100;
      }

      // 等额本息每月还款金额相同
      monthlyPayments = Array.from({ length: totalMonths }, (_, index) => {
        const month = index + 1;
        let currentPrincipal = 0;
        let currentInterest = 0;
        let remainingPrincipal = 0;

        if (loanRate !== "0") {
          // 计算每月本金和利息
          // 等额本息公式：每月还款额 = 贷款本金 × 月利率 × (1 + 月利率)^还款月数 / [(1 + 月利率)^还款月数 - 1]
          // 每月利息 = 剩余本金 × 月利率
          // 每月本金 = 每月还款额 - 每月利息

          // 计算到第month个月时的剩余本金
          let tempRemainingPrincipal = loanAmount;
          for (let i = 1; i <= month; i++) {
            currentInterest =
              Math.ceil(tempRemainingPrincipal * monthlyRate * 100) / 100;
            currentPrincipal = monthlyPayment - currentInterest;
            tempRemainingPrincipal -= currentPrincipal;
          }
          remainingPrincipal = Math.max(
            0,
            Math.ceil(tempRemainingPrincipal * 100) / 100
          );
        } else {
          currentPrincipal = monthlyPayment;
          currentInterest = 0;
          remainingPrincipal = Math.max(0, loanAmount - monthlyPayment * month);
        }

        return {
          month,
          principal: currentPrincipal,
          payment: monthlyPayment,
          interest: currentInterest,
          remainingPrincipal,
        };
      });

      const totalRepaymentAmount = monthlyPayment * totalMonths;
      const totalInterestAmount = totalRepaymentAmount - loanAmount;

      return {
        monthlyPayments,
        totalRepay: Math.ceil(totalRepaymentAmount * 100) / 100,
        totalInterest: Math.ceil(totalInterestAmount * 100) / 100,
      };
    } else {
      // 等额本金
      const monthlyPrincipal =
        Math.ceil((loanAmount / totalMonths) * 100) / 100;

      monthlyPayments = Array.from({ length: totalMonths }, (_, index) => {
        const month = index + 1;
        const remainingPrincipal = loanAmount - monthlyPrincipal * (month - 1);
        const interest =
          Math.ceil(remainingPrincipal * monthlyRate * 100) / 100;
        const totalMonthlyPayment = monthlyPrincipal + interest;

        return {
          month,
          principal: monthlyPrincipal,
          payment: totalMonthlyPayment,
          interest,
          remainingPrincipal: Math.ceil(remainingPrincipal * 100) / 100,
        };
      });

      const totalRepaymentAmount = monthlyPayments.reduce(
        (sum, item) => sum + item.payment,
        0
      );
      const totalInterestAmount = totalRepaymentAmount - loanAmount;

      return {
        monthlyPayments,
        totalRepay: Math.ceil(totalRepaymentAmount * 100) / 100,
        totalInterest: Math.ceil(totalInterestAmount * 100) / 100,
      };
    }
  };

  const onFinish = (values: any) => {
    const result = calculateLoan(values);
    setMonthlyPayment(result.monthlyPayments);
    setTotalRepay(result.totalRepay);
    setTotalInterest(result.totalInterest);
  };

  return (
    <Flex vertical gap={24}>
      <Row className="w-full">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="w-96"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label="房屋单价"
            name="price"
            rules={[{ required: true, message: "请输入单价" }]}
          >
            <Input addonAfter="元/m²" type="number" />
          </Form.Item>

          <Form.Item
            label="房屋面积"
            name="area"
            rules={[{ required: true, message: "请输入房屋面积" }]}
          >
            <Input addonAfter="m²" type="number" />
          </Form.Item>

          <Form.Item
            label="首付金额"
            name="downPayment"
            rules={[{ required: true, message: "请输入首付金额" }]}
          >
            <Input addonAfter="万元" type="number" />
          </Form.Item>

          <Form.Item
            label="贷款年限"
            name="loanYears"
            rules={[{ required: true, message: "请输入贷款年限" }]}
          >
            <Select options={loanYearsOptions} />
          </Form.Item>

          <Form.Item
            label="贷款利率"
            name="loanRate"
            rules={[{ required: true, message: "请输入贷款利率" }]}
          >
            <Input addonAfter="%" type="number" />
          </Form.Item>

          <Form.Item
            label="还款方式"
            name="repaymentMethod"
            rules={[{ required: true, message: "请选择还款方式" }]}
          >
            <Radio.Group>
              <Radio value="equal">等额本息</Radio>
              <Radio value="equalPrincipal">等额本金</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label={null}>
            <Row justify="end">
              <Button type="primary" htmlType="submit">
                计算房贷
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Row>
      <Row>
        <Flex className="mb-2" gap={16}>
          <Col>
            <Text strong>总还款金额: {totalRepay} 元</Text>
          </Col>
          <Col>
            <Text strong>总利息: {totalInterest} 元</Text>
          </Col>
        </Flex>

        {monthlyPayment.length > 0 && (
          <Table
            dataSource={monthlyPayment}
            pagination={false}
            size="middle"
            style={{ width: 800 }}
            scroll={{ y: 250 }}
            columns={[
              {
                title: "期数",
                dataIndex: "month",
                width: 80,
                fixed: "left",
              },
              {
                title: "每期应还总额 (元）",
                dataIndex: "payment",
                render: (value) => value.toFixed(2),
                width: 150,
              },
              {
                title: "每期应还本金 (元)",
                dataIndex: "principal",
                render: (value) => value.toFixed(2),
                width: 150,
              },
              {
                title: "每期应还利息 (元)",
                dataIndex: "interest",
                render: (value) => value.toFixed(2),
                width: 150,
              },
              {
                title: "剩余应还本金 (元)",
                dataIndex: "remainingPrincipal",
                render: (value) => value.toFixed(2),
                width: 150,
              },
            ]}
          />
        )}
      </Row>
    </Flex>
  );
};

// 页面标题组件
const PageHeader = ({ onOpenCalculator }: { onOpenCalculator: () => void }) => (
  <Flex justify="space-between" align="center" gap={8}>
    <Row gutter={{ xs: 8 }} align="middle">
      <Text strong className="text-2xl ml-2">
        城市房价
      </Text>
      <Text className="text-sm ml-2 text-blue-500 font-normal">
        ({`数据来源于网络, 仅供参考, 更新时间: 2025-07-27`})
      </Text>
    </Row>
    <Row>
      <Text
        className="text-sm ml-2 text-blue-500 font-normal cursor-pointer"
        onClick={onOpenCalculator}
      >
        房贷计算器
      </Text>
    </Row>
  </Flex>
);

// 城市选择器组件
const CitySelector = ({
  selectedCities,
  onCitiesChange,
}: {
  selectedCities: string[];
  onCitiesChange: (cities: string[]) => void;
}) => (
  <Select
    mode="multiple"
    value={selectedCities}
    onChange={(values) => {
      if (values.length <= maxSelectedCities) {
        onCitiesChange(values);
      } else {
        const newValues = values.slice(1, maxSelectedCities);
        newValues.push(values[values.length - 1]);
        onCitiesChange(newValues);
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
);

// 价格走势图表组件
const PriceChart = ({ chartData }: { chartData: any[] }) => {
  const lineConfig: any = {
    data: chartData,
    xField: "month",
    yField: "price",
    colorField: "city",
    shapeField: "smooth",
    xAxis: {
      nice: true,
      tickCount: 8, // 控制刻度数量
    },
    yAxis: {
      nice: true,
      tickCount: 6, // 控制刻度数量
    },
    tooltip: {
      title: (d: any) => {
        // 格式化 X 轴数据（月份）
        if (d.month && d.month.length === 6) {
          const year = d.month.substring(0, 4);
          const month = d.month.substring(4, 6);
          return `${year}-${month}`;
        }
        return d.month;
      },
      items: [
        {
          channel: "y",
          valueFormatter: (d: any) => `${d}元/m²`,
        },
      ],
    },
    style: {
      lineWidth: 2,
    },
    animate: { enter: { type: "pathIn", duration: 1000 } },
  };

  return <Line {...lineConfig} />;
};

// 主组件
export const CityPage = () => {
  const [houseDrawerOpen, setHouseDrawerOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "北京",
    "上海",
  ]);
  const [chartData, setChartData] = useState<any[]>([]);

  const generateCityPriceChartData = () => {
    const chartData: any[] = [];
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

  // 测试数据读取
  // useEffect(() => {
  //   readCityCSVData("zhengzhou", "郑州").then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={16}>
        <PageHeader onOpenCalculator={() => setHouseDrawerOpen(true)} />

        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card
              title={
                <Flex justify="space-between" align="center" gap={8}>
                  <Text strong>价格走势</Text>
                  <CitySelector
                    selectedCities={selectedCities}
                    onCitiesChange={setSelectedCities}
                  />
                </Flex>
              }
            >
              <Row gutter={[16, 16]}></Row>
              <PriceChart chartData={chartData} />
            </Card>
          </Col>
        </Row>

        <Drawer
          title="房贷计算器"
          width={560}
          onClose={() => setHouseDrawerOpen(false)}
          open={houseDrawerOpen}
        >
          <MortgageCalculator onClose={() => setHouseDrawerOpen(false)} />
        </Drawer>
      </Flex>
    </Spin>
  );
};
