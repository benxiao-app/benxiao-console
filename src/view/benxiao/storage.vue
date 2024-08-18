<template>
  <div>
    <Card shadow title='存储列表'>
      <template #extra>
        <Row>
          <Button type="success" @click="storageAction('create')">新建存储</Button>
        </Row>
      </template>
      <Modal
        v-model='showStorageCreate'
        @on-ok='storage_ok'
        @on-cancel='storage_cancel'
        title='新建存储'
      >
        <Form
          ref='storageForm'
          :model='storageForm'
          :rules='storageRule'
          :label-width='100'
        >
          <FormItem label='存储名称：' prop='name'>
            <Input v-model='storageForm.name' style='width: 300px'></Input>
          </FormItem>
        </Form>
      </Modal>
      <Table border :columns='storageColumns' :data='storageList'>
        <template slot-scope='{ row }' slot='action'>
          <Col span='12'>
            <Button type='info' size='small' @click="storageAction('permission', row)"
              >权限管理</Button
            >
          </Col>
          <Col span='12'>
            <Button
              type='warning'
              size='small'
              @click="storageAction('extend', row)"
              >扩容</Button
            >
          </Col>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import {
  getStorageList,
  createStorage
} from '@/api/data'

export default {
  name: 'storage',
  data () {
    return {
      showStorageCreate: false,
      storage_action: '',
      storageForm: {
        name: ''
      },
      storageRule: {
        name: [
          { required: true, message: '存储名称不能为空', trigger: 'blur' }
        ]
      },
      storageColumns: [
        {
          title: '名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '文件数',
          align: 'center',
          key: 'objects'
        },
        {
          title: '存储占用',
          align: 'center',
          key: 'size'
        },
        {
          title: '用户角色',
          align: 'center',
          key: 'definition'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'creation_date'
        },
        {
          title: '操作',
          slot: 'action',
          width: 250,
          align: 'center'
        }
      ],
      storageList: []
    }
  },
  methods: {
    storage_ok () {
      let _this = this
      if (this.storage_action === 'create') {
        createStorage(this.storageForm)
          .then(() => {
            return getStorageList()
          })
          .then(res => {
            _this.storageList = res
            _this.$Message.info('创建成功')
          })
      } else if (this.storage_action === 'edit') {
        editStorage(this.storageForm)
          .then(() => {
            return getStorageList()
          })
          .then(res => {
            _this.storageList = res
            // _this.formdataReset()
            // 初始化数据
            _this.$Message.info('修改成功')
          })
      } else {
      }
    },
    storage_cancel () {
      this.formdataReset()
    },
    formdataReset () {
      this.storageForm = {
        id: '',
        name: '',
        price: ''
      }
    },
    storageAction (action, data) {
      this.formdataReset()
      this.storage_action = action
      if (action === 'create') {
        this.showStorageCreate = true
        return
      }
      this.storageForm = {
        name: data.name
      }
    }
  },
  created () {
    getStorageList().then(res => {
      this.storageList = res
    })
  }
}
</script>
