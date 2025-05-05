namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
protected $fillable = [
'judul',
'slug',
'tag',
'penulis',
'kategori',
'gambar',
'isi',
'status',
'tanggal_terbit',
'views',
];
}