// 静态导入所有可能的城市CSV文件
const csvFiles = import.meta.glob("./oridata/*.csv", {
  query: "?raw",
  import: "default",
});

export const readCityCSVData = async (city: string, cityName?: string) => {
  // 构建文件路径
  const filePath = `./oridata/${city}.csv`;

  // 检查文件是否存在
  if (!csvFiles[filePath]) {
    throw new Error(`城市 ${city} 的数据文件不存在`);
  }

  const csvString = (await csvFiles[filePath]()) as string;

  // 解析CSV文件
  const lines = csvString.split("\n").filter((line) => line.trim()); // 过滤空行
  const data = lines.slice(1).map((line) => {
    const values = line.split(",");
    return {
      month: values[0],
      price: parseFloat(values[2]) || 0,
    };
  });

  return { city: cityName || city, data };
};

export const beijingData = {
  city: "北京",
  data: [
    {
      month: "202207",
      price: 58516,
    },
    {
      month: "202208",
      price: 58893,
    },
    {
      month: "202209",
      price: 59035,
    },
    {
      month: "202210",
      price: 59143,
    },
    {
      month: "202211",
      price: 59301,
    },
    {
      month: "202212",
      price: 59864,
    },
    {
      month: "202301",
      price: 59873,
    },
    {
      month: "202302",
      price: 60454,
    },
    {
      month: "202303",
      price: 60295,
    },
    {
      month: "202304",
      price: 60001,
    },
    {
      month: "202305",
      price: 60218,
    },
    {
      month: "202306",
      price: 60161,
    },
    {
      month: "202307",
      price: 59964,
    },
    {
      month: "202308",
      price: 59827,
    },
    {
      month: "202309",
      price: 59700,
    },
    {
      month: "202310",
      price: 59568,
    },
    {
      month: "202311",
      price: 59421,
    },
    {
      month: "202312",
      price: 59261,
    },
    {
      month: "202401",
      price: 59097,
    },
    {
      month: "202402",
      price: 58880,
    },
    {
      month: "202403",
      price: 58744,
    },
    {
      month: "202404",
      price: 58585,
    },
    {
      month: "202405",
      price: 58436,
    },
    {
      month: "202406",
      price: 58190,
    },
    {
      month: "202407",
      price: 58014,
    },
    {
      month: "202408",
      price: 57880,
    },
    {
      month: "202409",
      price: 57726,
    },
    {
      month: "202410",
      price: 57584,
    },
    {
      month: "202411",
      price: 57359,
    },
    {
      month: "202412",
      price: 57165,
    },
    {
      month: "202501",
      price: 56951,
    },
    {
      month: "202502",
      price: 56803,
    },
    {
      month: "202503",
      price: 56574,
    },
    {
      month: "202504",
      price: 56375,
    },
    {
      month: "202505",
      price: 56068,
    },
    {
      month: "202506",
      price: 55890,
    },
    {
      month: "202507",
      price: 55640,
    },
  ],
};

export const shanghaiData = {
  city: "上海",
  data: [
    {
      month: "202207",
      price: 55132,
    },
    {
      month: "202208",
      price: 55315,
    },
    {
      month: "202209",
      price: 55555,
    },
    {
      month: "202210",
      price: 55658,
    },
    {
      month: "202211",
      price: 55780,
    },
    {
      month: "202212",
      price: 55930,
    },
    {
      month: "202301",
      price: 56064,
    },
    {
      month: "202302",
      price: 56212,
    },
    {
      month: "202303",
      price: 56362,
    },
    {
      month: "202304",
      price: 56510,
    },
    {
      month: "202305",
      price: 56661,
    },
    {
      month: "202306",
      price: 56943,
    },
    {
      month: "202307",
      price: 57034,
    },
    {
      month: "202308",
      price: 57177,
    },
    {
      month: "202309",
      price: 57321,
    },
    {
      month: "202310",
      price: 57462,
    },
    {
      month: "202311",
      price: 57589,
    },
    {
      month: "202312",
      price: 58153,
    },
    {
      month: "202401",
      price: 58148,
    },
    {
      month: "202402",
      price: 58270,
    },
    {
      month: "202403",
      price: 58053,
    },
    {
      month: "202404",
      price: 57921,
    },
    {
      month: "202405",
      price: 57780,
    },
    {
      month: "202406",
      price: 57628,
    },
    {
      month: "202407",
      price: 57457,
    },
    {
      month: "202408",
      price: 57320,
    },
    {
      month: "202409",
      price: 57154,
    },
    {
      month: "202410",
      price: 56971,
    },
    {
      month: "202411",
      price: 56761,
    },
    {
      month: "202412",
      price: 56613,
    },
    {
      month: "202501",
      price: 56456,
    },
    {
      month: "202502",
      price: 56296,
    },
    {
      month: "202503",
      price: 56121,
    },
    {
      month: "202504",
      price: 55934,
    },
    {
      month: "202505",
      price: 55660,
    },
    {
      month: "202506",
      price: 55444,
    },
    {
      month: "202507",
      price: 55221,
    },
  ],
};

const tianjinData = {
  city: "天津",
  data: [
    {
      month: "202207",
      price: 17132,
    },
    {
      month: "202208",
      price: 17085,
    },
    {
      month: "202209",
      price: 16871,
    },
    {
      month: "202210",
      price: 16883,
    },
    {
      month: "202211",
      price: 16886,
    },
    {
      month: "202212",
      price: 16710,
    },
    {
      month: "202301",
      price: 16573,
    },
    {
      month: "202302",
      price: 16716,
    },
    {
      month: "202303",
      price: 16865,
    },
    {
      month: "202304",
      price: 16653,
    },
    {
      month: "202305",
      price: 16629,
    },
    {
      month: "202306",
      price: 16584,
    },
    {
      month: "202307",
      price: 16465,
    },
    {
      month: "202308",
      price: 16606,
    },
    {
      month: "202309",
      price: 16755,
    },
    {
      month: "202310",
      price: 16821,
    },
    {
      month: "202311",
      price: 16674,
    },
    {
      month: "202312",
      price: 16670,
    },
    {
      month: "202401",
      price: 16848,
    },
    {
      month: "202402",
      price: 16534,
    },
    {
      month: "202403",
      price: 16349,
    },
    {
      month: "202404",
      price: 16065,
    },
    {
      month: "202405",
      price: 15882,
    },
    {
      month: "202406",
      price: 15826,
    },
    {
      month: "202407",
      price: 15748,
    },
    {
      month: "202408",
      price: 15461,
    },
    {
      month: "202409",
      price: 15198,
    },
    {
      month: "202410",
      price: 15110,
    },
    {
      month: "202411",
      price: 15012,
    },
    {
      month: "202412",
      price: 14962,
    },
    {
      month: "202501",
      price: 14896,
    },
    {
      month: "202502",
      price: 15063,
    },
    {
      month: "202503",
      price: 15377,
    },
    {
      month: "202504",
      price: 15222,
    },
    {
      month: "202505",
      price: 15085,
    },
    {
      month: "202506",
      price: 14945,
    },
    {
      month: "202507",
      price: 14783,
    },
  ],
};

const jinanData = {
  city: "济南",
  data: [
    {
      month: "202207",
      price: 16240,
    },
    {
      month: "202208",
      price: 15809,
    },
    {
      month: "202209",
      price: 15840,
    },
    {
      month: "202210",
      price: 15724,
    },
    {
      month: "202211",
      price: 15643,
    },
    {
      month: "202212",
      price: 15761,
    },
    {
      month: "202301",
      price: 15545,
    },
    {
      month: "202302",
      price: 15889,
    },
    {
      month: "202303",
      price: 16019,
    },
    {
      month: "202304",
      price: 15997,
    },
    {
      month: "202305",
      price: 15966,
    },
    {
      month: "202306",
      price: 15748,
    },
    {
      month: "202307",
      price: 15764,
    },
    {
      month: "202308",
      price: 15613,
    },
    {
      month: "202309",
      price: 15413,
    },
    {
      month: "202310",
      price: 15330,
    },
    {
      month: "202311",
      price: 15124,
    },
    {
      month: "202312",
      price: 14831,
    },
    {
      month: "202401",
      price: 14817,
    },
    {
      month: "202402",
      price: 15211,
    },
    {
      month: "202403",
      price: 15132,
    },
    {
      month: "202404",
      price: 14857,
    },
    {
      month: "202405",
      price: 14645,
    },
    {
      month: "202406",
      price: 14400,
    },
    {
      month: "202407",
      price: 14204,
    },
    {
      month: "202408",
      price: 14198,
    },
    {
      month: "202409",
      price: 13965,
    },
    {
      month: "202410",
      price: 13858,
    },
    {
      month: "202411",
      price: 13914,
    },
    {
      month: "202412",
      price: 13804,
    },
    {
      month: "202501",
      price: 13889,
    },
    {
      month: "202502",
      price: 14097,
    },
    {
      month: "202503",
      price: 14247,
    },
    {
      month: "202504",
      price: 14183,
    },
    {
      month: "202505",
      price: 13913,
    },
    {
      month: "202506",
      price: 13738,
    },
    {
      month: "202507",
      price: 13625,
    },
  ],
};

const qingdaoData = {
  city: "青岛",
  data: [
    {
      month: "202207",
      price: 16416,
    },
    {
      month: "202208",
      price: 16398,
    },
    {
      month: "202209",
      price: 16298,
    },
    {
      month: "202210",
      price: 16322,
    },
    {
      month: "202211",
      price: 16387,
    },
    {
      month: "202212",
      price: 16472,
    },
    {
      month: "202301",
      price: 16546,
    },
    {
      month: "202302",
      price: 16244,
    },
    {
      month: "202303",
      price: 16115,
    },
    {
      month: "202304",
      price: 16053,
    },
    {
      month: "202305",
      price: 16081,
    },
    {
      month: "202306",
      price: 16102,
    },
    {
      month: "202307",
      price: 15828,
    },
    {
      month: "202308",
      price: 15523,
    },
    {
      month: "202309",
      price: 15195,
    },
    {
      month: "202310",
      price: 14934,
    },
    {
      month: "202311",
      price: 14776,
    },
    {
      month: "202312",
      price: 14915,
    },
    {
      month: "202401",
      price: 14872,
    },
    {
      month: "202402",
      price: 14931,
    },
    {
      month: "202403",
      price: 14856,
    },
    {
      month: "202404",
      price: 14705,
    },
    {
      month: "202405",
      price: 14599,
    },
    {
      month: "202406",
      price: 14559,
    },
    {
      month: "202407",
      price: 14434,
    },
    {
      month: "202408",
      price: 14293,
    },
    {
      month: "202409",
      price: 14113,
    },
    {
      month: "202410",
      price: 13999,
    },
    {
      month: "202411",
      price: 13845,
    },
    {
      month: "202412",
      price: 13744,
    },
    {
      month: "202501",
      price: 13563,
    },
    {
      month: "202502",
      price: 13547,
    },
    {
      month: "202503",
      price: 13345,
    },
    {
      month: "202504",
      price: 13134,
    },
    {
      month: "202505",
      price: 12981,
    },
    {
      month: "202506",
      price: 12827,
    },
    {
      month: "202507",
      price: 12606,
    },
  ],
};

const suzhouData = {
  city: "苏州",
  data: [
    {
      month: "202207",
      price: 21424,
    },
    {
      month: "202208",
      price: 21393,
    },
    {
      month: "202209",
      price: 21511,
    },
    {
      month: "202210",
      price: 21124,
    },
    {
      month: "202211",
      price: 21035,
    },
    {
      month: "202212",
      price: 21003,
    },
    {
      month: "202301",
      price: 20947,
    },
    {
      month: "202302",
      price: 21344,
    },
    {
      month: "202303",
      price: 21138,
    },
    {
      month: "202304",
      price: 21150,
    },
    {
      month: "202305",
      price: 21130,
    },
    {
      month: "202306",
      price: 21142,
    },
    {
      month: "202307",
      price: 21173,
    },
    {
      month: "202308",
      price: 20994,
    },
    {
      month: "202309",
      price: 20887,
    },
    {
      month: "202310",
      price: 20671,
    },
    {
      month: "202311",
      price: 20412,
    },
    {
      month: "202312",
      price: 20105,
    },
    {
      month: "202401",
      price: 19900,
    },
    {
      month: "202402",
      price: 19790,
    },
    {
      month: "202403",
      price: 19500,
    },
    {
      month: "202404",
      price: 19221,
    },
    {
      month: "202405",
      price: 18983,
    },
    {
      month: "202406",
      price: 18690,
    },
    {
      month: "202407",
      price: 18308,
    },
    {
      month: "202408",
      price: 18039,
    },
    {
      month: "202409",
      price: 17930,
    },
    {
      month: "202410",
      price: 17686,
    },
    {
      month: "202411",
      price: 17468,
    },
    {
      month: "202412",
      price: 17453,
    },
    {
      month: "202501",
      price: 17529,
    },
    {
      month: "202502",
      price: 17359,
    },
    {
      month: "202503",
      price: 17024,
    },
    {
      month: "202504",
      price: 16819,
    },
    {
      month: "202505",
      price: 16590,
    },
    {
      month: "202506",
      price: 16428,
    },
    {
      month: "202507",
      price: 15624,
    },
  ],
};

const hangzhouData = {
  city: "杭州",
  data: [
    {
      month: "202207",
      price: 35109,
    },
    {
      month: "202208",
      price: 34918,
    },
    {
      month: "202209",
      price: 34456,
    },
    {
      month: "202210",
      price: 34280,
    },
    {
      month: "202211",
      price: 34041,
    },
    {
      month: "202212",
      price: 33785,
    },
    {
      month: "202301",
      price: 33550,
    },
    {
      month: "202302",
      price: 32893,
    },
    {
      month: "202303",
      price: 33458,
    },
    {
      month: "202304",
      price: 32897,
    },
    {
      month: "202305",
      price: 32698,
    },
    {
      month: "202306",
      price: 32494,
    },
    {
      month: "202307",
      price: 32252,
    },
    {
      month: "202308",
      price: 32037,
    },
    {
      month: "202309",
      price: 31816,
    },
    {
      month: "202310",
      price: 31593,
    },
    {
      month: "202311",
      price: 30911,
    },
    {
      month: "202312",
      price: 30788,
    },
    {
      month: "202401",
      price: 30212,
    },
    {
      month: "202402",
      price: 30005,
    },
    {
      month: "202403",
      price: 30326,
    },
    {
      month: "202404",
      price: 30035,
    },
    {
      month: "202405",
      price: 29811,
    },
    {
      month: "202406",
      price: 30013,
    },
    {
      month: "202407",
      price: 30158,
    },
    {
      month: "202408",
      price: 30013,
    },
    {
      month: "202409",
      price: 29592,
    },
    {
      month: "202410",
      price: 29775,
    },
    {
      month: "202411",
      price: 29831,
    },
    {
      month: "202412",
      price: 29591,
    },
    {
      month: "202501",
      price: 29348,
    },
    {
      month: "202502",
      price: 29512,
    },
    {
      month: "202503",
      price: 29451,
    },
    {
      month: "202504",
      price: 29347,
    },
    {
      month: "202505",
      price: 28931,
    },
    {
      month: "202506",
      price: 28909,
    },
    {
      month: "202507",
      price: 28618,
    },
  ],
};

const nanjingData = {
  city: "南京",
  data: [
    {
      month: "202207",
      price: 26325,
    },
    {
      month: "202208",
      price: 26123,
    },
    {
      month: "202209",
      price: 26043,
    },
    {
      month: "202210",
      price: 25833,
    },
    {
      month: "202211",
      price: 25426,
    },
    {
      month: "202212",
      price: 25126,
    },
    {
      month: "202301",
      price: 25003,
    },
    {
      month: "202302",
      price: 25629,
    },
    {
      month: "202303",
      price: 26378,
    },
    {
      month: "202304",
      price: 26678,
    },
    {
      month: "202305",
      price: 26445,
    },
    {
      month: "202306",
      price: 26047,
    },
    {
      month: "202307",
      price: 25820,
    },
    {
      month: "202308",
      price: 26179,
    },
    {
      month: "202309",
      price: 26354,
    },
    {
      month: "202310",
      price: 26527,
    },
    {
      month: "202311",
      price: 26709,
    },
    {
      month: "202312",
      price: 26987,
    },
    {
      month: "202401",
      price: 27562,
    },
    {
      month: "202402",
      price: 27558,
    },
    {
      month: "202403",
      price: 27228,
    },
    {
      month: "202404",
      price: 27070,
    },
    {
      month: "202405",
      price: 26885,
    },
    {
      month: "202406",
      price: 26655,
    },
    {
      month: "202407",
      price: 26474,
    },
    {
      month: "202408",
      price: 26278,
    },
    {
      month: "202409",
      price: 26096,
    },
    {
      month: "202410",
      price: 25894,
    },
    {
      month: "202411",
      price: 25685,
    },
    {
      month: "202412",
      price: 25501,
    },
    {
      month: "202501",
      price: 25313,
    },
    {
      month: "202502",
      price: 25136,
    },
    {
      month: "202503",
      price: 24948,
    },
    {
      month: "202504",
      price: 24759,
    },
    {
      month: "202505",
      price: 24534,
    },
    {
      month: "202506",
      price: 24322,
    },
    {
      month: "202507",
      price: 24105,
    },
  ],
};

const wuhanData = {
  city: "武汉",
  data: [
    {
      month: "202207",
      price: 16359,
    },
    {
      month: "202208",
      price: 16261,
    },
    {
      month: "202209",
      price: 16229,
    },
    {
      month: "202210",
      price: 15938,
    },
    {
      month: "202211",
      price: 15865,
    },
    {
      month: "202212",
      price: 15789,
    },
    {
      month: "202301",
      price: 15762,
    },
    {
      month: "202302",
      price: 15840,
    },
    {
      month: "202303",
      price: 15829,
    },
    {
      month: "202304",
      price: 15750,
    },
    {
      month: "202305",
      price: 15637,
    },
    {
      month: "202306",
      price: 15469,
    },
    {
      month: "202307",
      price: 15270,
    },
    {
      month: "202308",
      price: 15075,
    },
    {
      month: "202309",
      price: 14864,
    },
    {
      month: "202310",
      price: 14749,
    },
    {
      month: "202311",
      price: 14549,
    },
    {
      month: "202312",
      price: 14351,
    },
    {
      month: "202401",
      price: 14197,
    },
    {
      month: "202402",
      price: 14384,
    },
    {
      month: "202403",
      price: 14148,
    },
    {
      month: "202404",
      price: 13910,
    },
    {
      month: "202405",
      price: 13684,
    },
    {
      month: "202406",
      price: 13482,
    },
    {
      month: "202407",
      price: 13238,
    },
    {
      month: "202408",
      price: 13114,
    },
    {
      month: "202409",
      price: 12871,
    },
    {
      month: "202410",
      price: 12676,
    },
    {
      month: "202411",
      price: 12462,
    },
    {
      month: "202412",
      price: 12354,
    },
    {
      month: "202501",
      price: 12284,
    },
    {
      month: "202502",
      price: 12232,
    },
    {
      month: "202503",
      price: 12205,
    },
    {
      month: "202504",
      price: 12009,
    },
    {
      month: "202505",
      price: 11889,
    },
    {
      month: "202506",
      price: 11786,
    },
    {
      month: "202507",
      price: 11689,
    },
  ],
};

const xiamenData = {
  city: "厦门",
  data: [
    {
      month: "202207",
      price: 51537,
    },
    {
      month: "202208",
      price: 51731,
    },
    {
      month: "202209",
      price: 51876,
    },
    {
      month: "202210",
      price: 51969,
    },
    {
      month: "202211",
      price: 52362,
    },
    {
      month: "202212",
      price: 52642,
    },
    {
      month: "202301",
      price: 52618,
    },
    {
      month: "202302",
      price: 53012,
    },
    {
      month: "202303",
      price: 53069,
    },
    {
      month: "202304",
      price: 53393,
    },
    {
      month: "202305",
      price: 53061,
    },
    {
      month: "202306",
      price: 52920,
    },
    {
      month: "202307",
      price: 52821,
    },
    {
      month: "202308",
      price: 52671,
    },
    {
      month: "202309",
      price: 52556,
    },
    {
      month: "202310",
      price: 52374,
    },
    {
      month: "202311",
      price: 52216,
    },
    {
      month: "202312",
      price: 52030,
    },
    {
      month: "202401",
      price: 51835,
    },
    {
      month: "202402",
      price: 51526,
    },
    {
      month: "202403",
      price: 51442,
    },
    {
      month: "202404",
      price: 51250,
    },
    {
      month: "202405",
      price: 51073,
    },
    {
      month: "202406",
      price: 50899,
    },
    {
      month: "202407",
      price: 50677,
    },
    {
      month: "202408",
      price: 50583,
    },
    {
      month: "202409",
      price: 50414,
    },
    {
      month: "202410",
      price: 50267,
    },
    {
      month: "202411",
      price: 50146,
    },
    {
      month: "202412",
      price: 49628,
    },
    {
      month: "202501",
      price: 49276,
    },
    {
      month: "202502",
      price: 48916,
    },
    {
      month: "202503",
      price: 48526,
    },
    {
      month: "202504",
      price: 48170,
    },
    {
      month: "202505",
      price: 47795,
    },
    {
      month: "202506",
      price: 47419,
    },
    {
      month: "202507",
      price: 47010,
    },
  ],
};

const zhuhaiData = {
  city: "珠海",
  data: [
    {
      month: "202207",
      price: 23024,
    },
    {
      month: "202208",
      price: 22792,
    },
    {
      month: "202209",
      price: 22796,
    },
    {
      month: "202210",
      price: 22800,
    },
    {
      month: "202211",
      price: 22613,
    },
    {
      month: "202212",
      price: 22007,
    },
    {
      month: "202301",
      price: 22199,
    },
    {
      month: "202302",
      price: 22626,
    },
    {
      month: "202303",
      price: 22297,
    },
    {
      month: "202304",
      price: 22303,
    },
    {
      month: "202305",
      price: 22383,
    },
    {
      month: "202306",
      price: 21969,
    },
    {
      month: "202307",
      price: 21624,
    },
    {
      month: "202308",
      price: 21248,
    },
    {
      month: "202309",
      price: 20924,
    },
    {
      month: "202310",
      price: 21009,
    },
    {
      month: "202311",
      price: 21113,
    },
    {
      month: "202312",
      price: 21005,
    },
    {
      month: "202401",
      price: 20952,
    },
    {
      month: "202402",
      price: 20950,
    },
    {
      month: "202403",
      price: 20958,
    },
    {
      month: "202404",
      price: 20825,
    },
    {
      month: "202405",
      price: 20496,
    },
    {
      month: "202406",
      price: 20360,
    },
    {
      month: "202407",
      price: 20185,
    },
    {
      month: "202408",
      price: 19882,
    },
    {
      month: "202409",
      price: 19772,
    },
    {
      month: "202410",
      price: 19591,
    },
    {
      month: "202411",
      price: 19388,
    },
    {
      month: "202412",
      price: 19243,
    },
    {
      month: "202501",
      price: 19066,
    },
    {
      month: "202502",
      price: 19033,
    },
    {
      month: "202503",
      price: 18823,
    },
    {
      month: "202504",
      price: 18744,
    },
    {
      month: "202505",
      price: 18509,
    },
    {
      month: "202506",
      price: 18249,
    },
    {
      month: "202507",
      price: 18062,
    },
  ],
};

const guangzhouData = {
  city: "广州",
  data: [
    {
      month: "202207",
      price: 35746,
    },
    {
      month: "202208",
      price: 34972,
    },
    {
      month: "202209",
      price: 34379,
    },
    {
      month: "202210",
      price: 33822,
    },
    {
      month: "202211",
      price: 33419,
    },
    {
      month: "202212",
      price: 33280,
    },
    {
      month: "202301",
      price: 33056,
    },
    {
      month: "202302",
      price: 33460,
    },
    {
      month: "202303",
      price: 33671,
    },
    {
      month: "202304",
      price: 34593,
    },
    {
      month: "202305",
      price: 33935,
    },
    {
      month: "202306",
      price: 33713,
    },
    {
      month: "202307",
      price: 33528,
    },
    {
      month: "202308",
      price: 32547,
    },
    {
      month: "202309",
      price: 32411,
    },
    {
      month: "202310",
      price: 32044,
    },
    {
      month: "202311",
      price: 31465,
    },
    {
      month: "202312",
      price: 30953,
    },
    {
      month: "202401",
      price: 30770,
    },
    {
      month: "202402",
      price: 30585,
    },
    {
      month: "202403",
      price: 30228,
    },
    {
      month: "202404",
      price: 29922,
    },
    {
      month: "202405",
      price: 29572,
    },
    {
      month: "202406",
      price: 30140,
    },
    {
      month: "202407",
      price: 30348,
    },
    {
      month: "202408",
      price: 30533,
    },
    {
      month: "202409",
      price: 31371,
    },
    {
      month: "202410",
      price: 30857,
    },
    {
      month: "202411",
      price: 30013,
    },
    {
      month: "202412",
      price: 30069,
    },
    {
      month: "202501",
      price: 29673,
    },
    {
      month: "202502",
      price: 29483,
    },
    {
      month: "202503",
      price: 29521,
    },
    {
      month: "202504",
      price: 29659,
    },
    {
      month: "202505",
      price: 29230,
    },
    {
      month: "202506",
      price: 29262,
    },
    {
      month: "202507",
      price: 29419,
    },
  ],
};

const yantaiData = {
  city: "烟台",
  data: [
    {
      month: "202207",
      price: 9473,
    },
    {
      month: "202208",
      price: 9367,
    },
    {
      month: "202209",
      price: 9440,
    },
    {
      month: "202210",
      price: 9450,
    },
    {
      month: "202211",
      price: 9325,
    },
    {
      month: "202212",
      price: 9268,
    },
    {
      month: "202301",
      price: 9254,
    },
    {
      month: "202302",
      price: 9347,
    },
    {
      month: "202303",
      price: 9266,
    },
    {
      month: "202304",
      price: 9074,
    },
    {
      month: "202305",
      price: 8733,
    },
    {
      month: "202306",
      price: 8587,
    },
    {
      month: "202307",
      price: 8447,
    },
    {
      month: "202308",
      price: 8106,
    },
    {
      month: "202309",
      price: 7837,
    },
    {
      month: "202310",
      price: 7744,
    },
    {
      month: "202311",
      price: 7588,
    },
    {
      month: "202312",
      price: 7499,
    },
    {
      month: "202401",
      price: 7519,
    },
    {
      month: "202402",
      price: 7550,
    },
    {
      month: "202403",
      price: 7575,
    },
    {
      month: "202404",
      price: 7457,
    },
    {
      month: "202405",
      price: 7345,
    },
    {
      month: "202406",
      price: 7192,
    },
    {
      month: "202407",
      price: 7129,
    },
    {
      month: "202408",
      price: 7059,
    },
    {
      month: "202409",
      price: 6986,
    },
    {
      month: "202410",
      price: 6971,
    },
    {
      month: "202411",
      price: 7002,
    },
    {
      month: "202412",
      price: 6972,
    },
    {
      month: "202501",
      price: 6951,
    },
    {
      month: "202502",
      price: 6958,
    },
    {
      month: "202503",
      price: 6883,
    },
    {
      month: "202504",
      price: 6771,
    },
    {
      month: "202505",
      price: 6693,
    },
    {
      month: "202506",
      price: 6677,
    },
    {
      month: "202507",
      price: 6637,
    },
  ],
};

export const allCityPriceData = [
  beijingData,
  shanghaiData,
  tianjinData,
  jinanData,
  qingdaoData,
  yantaiData,
  suzhouData,
  hangzhouData,
  nanjingData,
  wuhanData,
  xiamenData,
  zhuhaiData,
  guangzhouData,
];
