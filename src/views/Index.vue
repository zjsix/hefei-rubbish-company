<template>
  <div>
    <div class="head">
      <el-input
        style="margin-left: 20px; width: 500px"
        clearable
        v-model="keywords"
        placeholder="请输入公司名称搜索..."
        @keyup.13.native="getList"
      >
        <el-button
          type="primary"
          @click="getList"
          slot="append"
          icon="el-icon-search"
          >搜索</el-button
        >
      </el-input>
      <el-button style="margin-left: 50px" type="primary" @click="openWindow(1)"
        >添加公司</el-button
      >
    </div>
    <el-container>
      <el-main>
        <el-table :stripe="true" :data="tableData" style="width: 100%">
          <el-table-column prop="xh" label="序号" width="100" />
          <el-table-column
            prop="name"
            label="公司名称"
            show-overflow-tooltip
            width="150"
          />
          <el-table-column
            prop="station"
            label="岗位"
            show-overflow-tooltip
            width="100"
          />
          <el-table-column label="原因描述">
            <template slot-scope="scope">
              <div v-if="!scope.row.description">无数据</div>
              <el-popover placement="top" v-else width="600" trigger="hover">
                <div
                  style="margin: 6px 0px"
                  v-for="(item, index) in scope.row.description.split(';')"
                  :key="index"
                >
                  {{ item }}
                </div>
                <div slot="reference">
                  <div
                    v-for="(item, index) in scope.row.description.split(';').slice(0,5)"
                    class="on-line"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="质疑">
            <template slot-scope="scope">
              <div v-if="!scope.row.doubt">无数据</div>
              <el-popover placement="top" v-else width="600" trigger="hover">
                <div
                  style="margin: 6px 0px"
                  v-for="(item, index) in scope.row.doubt.split(';')"
                  :key="index"
                >
                  {{ item }}
                </div>
                <div slot="reference">
                  <div
                    v-for="(item, index) in scope.row.doubt.split(';').slice(0,5)"
                    class="on-line"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="270">
            <template slot-scope="scope">
              <div>
                <el-button
                  type="primary"
                  size="small"
                  @click="openWindow(2, scope.row)"
                  >我要吐槽</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  @click="openWindow(3, scope.row)"
                  >我有质疑</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  @click="openWindow(4, scope.row)"
                  >吃瓜</el-button
                >
                <!-- <el-button
                  type="primary"
                  size="small"
                  @click="delItem(scope.row)"
                  >申诉</el-button
                > -->
              </div>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          :total="total"
          :page.sync="page.pageNum"
          :limit.sync="page.pageSize"
          background
          layout="total, prev, pager, next, sizes"
          @pagination="getList('page')"
        />
      </el-main>
    </el-container>

    <div align="center">文明吐槽 bug反馈:hidoublex@gmail.com  <a href="https://github.com/zjsix/hefei-rubbish-company">github</a></div>
    <div align="center"><a href="http://122.114.222.162/wechat1.jpg" target="__blank">群聊(我不是群主)</a></div>

    <el-dialog
      :title="windowTitle"
      :visible.sync="windowVisible"
      width="800px"
      :destroy-on-close="true"
      v-if="windowVisible"
    >
      <el-form
        ref="windowForm"
        :rules="rules"
        :model="windowForm"
        label-width="100px"
      >
        <el-form-item
          v-if="windowType == 1"
          ref="name"
          label="公司名称:"
          prop="name"
        >
          <el-input
            v-model="windowForm.name"
            style="width: 100%"
            placeholder="请输入你要吐槽的公司名称"
          />
        </el-form-item>
        <el-form-item
          v-if="windowType == 1"
          ref="station"
          label="岗位名称:"
          prop="station"
        >
          <el-input
            v-model="windowForm.station"
            style="width: 100%"
            placeholder="请输入岗位名称"
          />
        </el-form-item>
        <el-form-item
          v-if="windowType == 1 || windowType == 2"
          ref="description"
          label="槽点:"
          prop="description"
        >
          <el-input
            type="textarea"
            v-model="windowForm.description"
            style="width: 100%"
            placeholder="请输入你要吐槽的"
          />
        </el-form-item>
        <el-form-item
          v-if="windowType == 3"
          ref="doubt"
          label="质疑点:"
          prop="doubt"
        >
          <el-input
            type="textarea"
            v-model="windowForm.doubt"
            style="width: 100%"
            placeholder="对槽点你有什么觉得质疑"
          />
        </el-form-item>
      </el-form>

      <el-tabs type="border-card" v-model="activeItem" v-if="windowType == 4">
        <el-tab-pane label="吐槽" :name="1">
          <el-empty
            v-if="!description || description.length == 0"
            description="无数据"
          ></el-empty>
          <el-timeline v-else>
            <el-timeline-item
              v-for="(item, index) in description"
              :key="index"
              :timestamp="item.time"
            >
              {{ item.description }}
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
        <el-tab-pane label="质疑" :name="2">
          <el-empty
            v-if="!doubt || doubt.length == 0"
            description="无数据"
          ></el-empty>
          <el-timeline v-else>
            <el-timeline-item
              v-for="(item, index) in doubt"
              :key="index"
              :timestamp="item.time"
            >
              {{ item.doubt }}
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer text-center">
        <el-button v-if="windowType != 4" type="primary" @click="windowSubmit"
          >保 存</el-button
        >
        <el-button
          @click="
            windowVisible = false;
            $refs.windowForm.resetFields();
          "
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCompany,
  addCompany,
  addDescription,
  addDoubt,
  getInfo,
} from "@/api/api";
export default {
  name: "IndexData",
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      activeItem: 1,
      total: 0,
      keywords: "",
      windowTitle: "",
      windowType: "",
      tableData: [],
      height: 500,
      windowVisible: false,
      windowForm: {},
      description: [],
      doubt: [],
      rules: {
        name: [
          { required: true, message: "请输入公司名称！", trigger: "change" },
          { min: 1, max: 30, message: "长度限制为1-30！", trigger: "change" },
        ],
        station: [
          { required: true, message: "请输入岗位名称！", trigger: "change" },
          { min: 1, max: 10, message: "长度限制为1-10！", trigger: "change" },
        ],
        description: [
          { required: true, message: "请输入吐槽点！", trigger: "change" },
          {
            min: 1,
            max: 500,
            message: "长度限制为1-500！",
            trigger: "change",
          },
        ],
        doubt: [
          { required: true, message: "请输入吐槽点！", trigger: "change" },
          {
            min: 1,
            max: 500,
            message: "长度限制为1-500！",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.height = window.innerHeight - 200;
    this.getList();
    this.$message.warning('感谢大家反馈问题，希望大家一起维护这个环境，勿透露人物姓名。')
    setInterval(function() {
        check();
      }, 100);
      var check = function() {
        function doCheck(a) {
          if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
            (function() {}['constructor']('debugger')());
          } else {
            (function() {}['constructor']('debugger')());
          }
          doCheck(++a);
        }
        try {
          doCheck(0);
        } catch (err) {}
      };
      check();
  },
  methods: {
    async getList(page = "") {
      try {
        if (!page) {
          this.page.pageNum = 1;
          this.page.pageSize = 10;
        }
        const res = await getCompany(
          Object.assign({}, { page: this.page }, { keywords: this.keywords })
        );
        this.tableData = res.data;
        this.total = res.page.total;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * @param type 1新增 2添加吐槽  3 质疑  4查看详情
     */
    async openWindow(type, row) {
      this.windowType = type;
      switch (type) {
        case 1:
          this.windowTitle = "添加公司";
          break;
        case 2:
          this.windowTitle = "添加吐槽点";
          break;
        case 3:
          this.windowTitle = "质疑吐槽点";
          break;
        case 4:
          const res = await getInfo({ id: row.id });
          this.description = res.data.description;
          this.doubt = res.data.doubt;
          this.windowTitle = "查看详情";
          break;
      }
      if (type !== 1) {
        this.windowForm.id = row.id;

      }
      this.windowVisible = true;
    },
    windowSubmit() {
      this.$refs.windowForm.validate(async (valid) => {
        if (valid) {
          try {
            let api = null;
            switch (this.windowType) {
              case 1:
                api = addCompany;
                break;
              case 2:
                api = addDescription;
                break;
              case 3:
                api = addDoubt;
                break;
            }
            await api(this.windowForm);
            this.$message.success("已提交审核！");
            this.windowVisible = false;
            this.$refs.windowForm.resetFields();
            this.getList('page');
          } catch (e) {
            console.log(e);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.head {
  margin-top: 20px;
  display: flex;
  flex-flow: row nowrap;
}

.on-line {
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>