public function up()
{
Schema::create('kategori', function (Blueprint $table) {
$table->id();
$table->string('nama');
$table->timestamps();
});
}
