import React from "react";
import { Modal, Button, Popconfirm, Table, Tag, Form, Input, DatePicker } from "antd";
import './Task.less';

// 对日期处理的方法
const zero = function zero(text) {
  text = String(text);
  return text.length < 2 ? '0' + text : text;
};
const formatTime = function formatTime(time) {
  let arr = time.match(/\d+/g),
    [, month, day, hours = '00', minutes = '00'] = arr;
  return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`;
};

class Task extends React.Component {

  // 定义表格列的数据
  columns = [{
    title: '编号',
    dataIndex: 'id',
    align: "center",
    width: "8%"
  }, {
    title: '任务描述',
    dataIndex: 'task',
    ellipsis: true,
    width: "50%"
  }, {
    title: '状态',
    dataIndex: 'state',
    align: "center",
    width: "10%",
    render: text => +text === 1 ? '未完成' : '已完成'
  }, {
    title: '完成时间',
    dataIndex: 'time',
    align: "center",
    width: "18%",
    render: (_, record) => {
      let { state, time, complete } = record;
      if (+state === 2) time = complete;
      return formatTime(time);
    }
  }, {
    "title": '操作',
    render(_, record) {
      let { state } = record;
      return <>
        <Popconfirm title="您确定要删除此任务吗？" onConfirm={() => { }}>
          <Button type="link">删除</Button>
        </Popconfirm>

        {+state !== 2 ? <Popconfirm title="您确定要把此任务设置为完成吗？"
          onConfirm={() => { }}>
          <Button type="link">完成</Button>
        </Popconfirm> : null}
      </>
    }
  }]

  // 初始组件的状态
  state = {
    tableData: [],
    tableLoading: false,
    modalVisible: false,
    confirmLoading: false,
    ruleForm: {
      task: '',
      time: ''
    }
  };

  // 对话框和表单处理
  // 关闭对话框 & 清除表单中的内容
  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }
  // 新增任务
  submit = () => {

  }

  render() {
    let { tableData, tableLoading, modalVisible, confirmLoading } = this.state;
    return <div className="task-box">
      {/* 头部 */}
      <div className="header">
        <h2 className="title">TASKOA 任务管理系统</h2>
        <Button type="primary" onClick={() => {
          this.setState({
            modalVisible: true
          })
        }}>新增任务</Button>
      </div>

      {/* 标签 */}
      <div className="tag-box">
        <Tag color="#1677ff">全部</Tag>
        <Tag>未完成</Tag>
        <Tag>已完成</Tag>
      </div>

      {/* 表格 */}
      <Table dataSource={tableData} columns={this.columns}
        loading={tableLoading} pagination={false} rowKey="id" />˝

      {/* 对话框 & 表单 */}
      <Modal
        title="新增任务窗口"
        open={modalVisible}
        confirmLoading={confirmLoading}
        keyboard={false}
        maskClosable={false} okText="确认提交"
        onCancel={this.closeModal}
        onOk={this.submit}
      >
        <Form>
          <Form.Item>
            <Input.TextArea
              rows={4}
              value={this.state.ruleForm.task}
              onChange={ev => {
                let target = ev.target,
                  text = target.value.trim();
                this.setState({
                  ruleForm: {
                    ...this.state.ruleForm,
                    task: text
                  }
                })
              }}
            ></Input.TextArea>
          </Form.Item>

          <Form.Item>
            <DatePicker
              showTime
              value={this.state.ruleForm.time}
              onChange={value => {
                // value：获取的是当前选中的日期「dayjs日期对象」
                this.setState({
                  ruleForm: {
                    ...this.state.ruleForm,
                    time: value
                  }
                })
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  }
}

export default Task;

// init 