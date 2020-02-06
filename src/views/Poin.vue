<template>
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><b>Data Poin Siswa</b></p>
                  <div class="table-responsive">
                    <b-form-input type="text" v-on:keyup.enter="searching" v-model="search" placeholder="Pencarian Siswa..."></b-form-input>
                    <div class="dropdown-divider"></div>
                    <b-table striped hover :items="data_poin" :fields="fields">
                  <template v-slot:cell(total_poin)="data">
                    <b-badge variant="primary">{{ data.item.total_poin }}</b-badge>
                  </template>
                  <template v-slot:cell(Aksi)="data">
                    <b-button size="sm" variant="warning" v-on:click="Detail(data.item.id)" v-b-modal.modalTatib><i class="mdi mdi-pencil btn-icon-prepend"></i>Detail</b-button>&nbsp;
                  </template>
                </b-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <b-modal id="modalTatib" size="lg" hide-footer>
      <template v-slot:modal-title>
        Detail Poin Pelanggaran
      </template>
        <b-table striped hover :items="detail_poin" :fields="fields_detail">
          <template v-slot:cell(poin)="data">
            <h5><b-badge variant="warning">{{ data.item.poin}}</b-badge></h5>
              </template>
        </b-table>
    </b-modal>
    </div>
    </div>
</template>
<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      id_siswa: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      data_poin: [],
      detail_poin: [],
      fields: ["nis", "nama_siswa", "kelas", "total_poin", "Aksi"],
      fields_detail: ["tanggal", "nama_pelanggaran", "kategori", "keterangan", "poin"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/poin_siswa/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.data_poin = response.data.poin;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data petugas."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    searching : function(id){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast"); 
      let form = new FormData;
      form.append ("find", this.search)
      this.axios.post("/poin_siswa/" + this.perPage + "/" + offset, form, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.data_poin = response.data.poin;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data petugas."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    Detail : function(id){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.axios.get("/poin_siswa/" + id, conf)
      .then(response => {
        this.detail_poin = response.data.detail;
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>