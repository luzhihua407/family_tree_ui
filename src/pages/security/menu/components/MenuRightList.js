import { Table, Input, Button, Popconfirm, Form } from 'antd'
import { PureComponent } from 'react'

const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends PureComponent {
  save = e => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      // this.toggleEdit();
      //handleSave({ ...record, ...values });
      console.log(...values)
    })
  }
  handleOk = () => {
    // const {item = {}, onOk, form} = this.props
    const { validateFields, getFieldsValue } = this.form
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      console.log(data)
    })
  }
  renderCell = form => {
    this.form = form
    const { dataIndex, record, title } = this.props
    return (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    )
  }

  render() {
    const {
      form,
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props

    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

class EditableTable extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '名称',
        dataIndex: 'rightName',
        width: '30%',
        editable: true,
      },
      {
        title: '编码',
        dataIndex: 'rightCode',
        width: '30%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '30%',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="确定删除?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ]

    this.state = {
      dataSource: [],
      count: 2,
    }
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }

  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData = {
      key: count,
      rightName: '',
      rightCode: '',
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    })
  }

  render() {
    const { dataSource } = this.state
    const { form } = this.props
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      }
    })
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加
        </Button>
        <Button
          onClick={this.handleOk}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          保存
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    )
  }
}

export default EditableTable
