class NotesController < ActionController::API
  def index
    @notes = Note.order("created_at DESC")

    render json: @notes
  end
p

  def create
    @note = Note.create(note_params)

    render json: @note
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_params)

    render json: @note
  end

  def destroy
    @note = Note.find(params[:id])
    logger.debug "note: #{@note.to_json}"

    if @note.destroy
      head :no_content, status: :ok
    else
      render json: @note.errors, status: :unprocessible_entity
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
