import { Card, Statistic } from "antd";
import React from "react";

type IProps = {
  title?: React.ReactNode;
  value: string | number;
};

const CustomKpi = (props: IProps) => {
  return (
    <div className="col">
      <Card bordered>
        <Statistic title={props.title} value={props.value} />
      </Card>
    </div>
  );
};

export default CustomKpi;
