public function up()
{
Schema::create('berita', function (Blueprint $table) {
$table->id();
$table->string('judul');
$table->string('slug');
$table->string('penulis');
$table->string('tag')->nullable();
$table->foreignId('kategori_id')->constrained('kategori')->onDelete('cascade');
$table->text('isi');
$table->enum('status', ['TERTAYANG', 'TERJADWAL']);
$table->timestamp('tanggal_terbit')->nullable();
$table->timestamps();
});
}